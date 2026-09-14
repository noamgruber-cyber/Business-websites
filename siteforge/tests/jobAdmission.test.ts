import { randomUUID } from 'node:crypto';
import { initializeApp, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { createSiteService, blankDraft } from '@/lib/server/sites';
import { createJobService } from '@/lib/server/jobs';
const suite = process.env.FIRESTORE_EMULATOR_HOST ? describe : describe.skip;
suite('atomic generation admission', () => {
  let app: ReturnType<typeof initializeApp>, db: ReturnType<typeof getFirestore>;
  let day = 0;
  const config = { enabled: true, model: 'test-model', ownerDailyLimit: 3, platformDailyLimit: 20 };
  beforeAll(() => {
    expect(process.env.FIREBASE_PROJECT_ID).toBe('demo-siteforge');
    expect(process.env.FIRESTORE_EMULATOR_HOST).toMatch(/^(127\.0\.0\.1|localhost):\d+$/);
    app = initializeApp({ projectId: 'demo-siteforge' }, randomUUID()); db = getFirestore(app);
  });
  afterAll(async () => { if (app) await deleteApp(app); });
  async function fixture(tick = Date.UTC(2040, 0, ++day)) {
    const uid = randomUUID();
    const site = await createSiteService(db).create(uid, { category: 'gym', language: 'en' }, 'create');
    const intake = blankDraft('gym', 'en');
    intake.facts.businessName = 'Test gym';
    intake.facts.description = 'A gym offering individual training sessions.';
    intake.facts.phone = '+972501234567';
    await db.doc(`sites/${site.id}`).update({ draft: intake });
    return { uid, id: site.id, intake, tick, jobs: createJobService(db, () => tick, config) };
  }
  it('twenty duplicate requests create one immutable snapshot and charge once', async () => {
    const f = await fixture();
    const results = await Promise.all(Array.from({ length: 20 }, () => f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, 'same')));
    expect(new Set(results.map(r => r.jobId)).size).toBe(1);
    const job = await db.doc(`generationJobs/${results[0].jobId}`).get();
    expect(job.get('inputSnapshot')).toEqual(f.intake);
    expect(job.get('modelCallCount')).toBe(0);
    expect((await db.collection('generationJobs').where('siteId', '==', f.id).get()).size).toBe(1);
    const date = new Date(f.tick).toISOString().slice(0, 10);
    expect((await db.doc(`generationUsage/${f.uid}_${date}`).get()).get('admitted')).toBe(1);
    expect((await db.doc(`platformUsage/${date}`).get()).get('admitted')).toBe(1);
    await expect(f.jobs.enqueue(f.uid, f.id, { expectedRevision: 1 }, 'same')).rejects.toMatchObject({ code: 'IDEMPOTENCY_CONFLICT' });
  }, 30000);
  it('distinct concurrent keys admit only one active job', async () => {
    const f = await fixture();
    const results = await Promise.allSettled(['a', 'b'].map(k => f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, k)));
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect(results.find(r => r.status === 'rejected')).toMatchObject({ reason: { code: 'JOB_ACTIVE' } });
  });
  it('enforces owner quota and permits a new UTC day', async () => {
    const f = await fixture();
    for (let i = 0; i < 3; i++) {
      const result = await f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, `${i}`);
      await db.doc(`generationJobs/${result.jobId}`).update({ state: 'failed' });
      await db.doc(`sites/${f.id}`).update({ activeJobId: null });
    }
    await expect(f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, 'over')).rejects.toMatchObject({ code: 'LIMIT_REACHED' });
    await expect(createJobService(db, () => f.tick + 86400000, config).enqueue(f.uid, f.id, { expectedRevision: 0 }, 'tomorrow')).resolves.toMatchObject({ state: 'queued' });
  });
  it('serializes the global quota across different owners', async () => {
    const tick = Date.UTC(2050, 0, 1);
    const fixtures = await Promise.all([fixture(tick), fixture(tick)]);
    const results = await Promise.allSettled(fixtures.map(f => createJobService(db, () => tick, { ...config, platformDailyLimit: 1 }).enqueue(f.uid, f.id, { expectedRevision: 0 }, 'global')));
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect(results.find(r => r.status === 'rejected')).toMatchObject({ reason: { code: 'LIMIT_REACHED' } });
  });
  it('rejects foreign owners, stale revisions, missing configuration and incomplete contacts', async () => {
    const f = await fixture();
    await expect(f.jobs.enqueue('other', f.id, { expectedRevision: 0 }, 'a')).rejects.toMatchObject({ code: 'NOT_FOUND' });
    await expect(f.jobs.enqueue(f.uid, f.id, { expectedRevision: 1 }, 'a')).rejects.toMatchObject({ code: 'REVISION_CONFLICT' });
    for (const overrides of [{ enabled: false }, { model: '' }]) {
      await expect(createJobService(db, () => f.tick, { ...config, ...overrides }).enqueue(f.uid, f.id, { expectedRevision: 0 }, 'a')).rejects.toMatchObject({ code: 'SERVICE_UNAVAILABLE' });
    }
    await db.doc(`sites/${f.id}`).update({ 'draft.facts.phone': null });
    await expect(f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, 'a')).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    expect((await db.collection('generationJobs').where('siteId', '==', f.id).get()).empty).toBe(true);
  });
  it('rejects unconfirmed rights, pending images and foreign images', async () => {
    const f = await fixture(), assetId = randomUUID();
    await db.doc(`sites/${f.id}`).update({ 'draft.imageAssetIds': [assetId] });
    await expect(f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, 'a')).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    await db.doc(`sites/${f.id}`).update({ 'draft.rightsConfirmed': true });
    for (const asset of [
      { ownerUid: f.uid, siteId: f.id, status: 'reserved' },
      { ownerUid: 'other', siteId: f.id, status: 'ready' },
      { ownerUid: f.uid, siteId: randomUUID(), status: 'ready' },
    ]) {
      await db.doc(`assets/${assetId}`).set(asset);
      await expect(f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, 'a')).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    }
    await db.doc(`assets/${assetId}`).set({ ownerUid: f.uid, siteId: f.id, status: 'ready' });
    await expect(f.jobs.enqueue(f.uid, f.id, { expectedRevision: 0 }, 'a')).resolves.toMatchObject({ state: 'queued' });
  });
});
