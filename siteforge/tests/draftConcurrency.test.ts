import { randomUUID } from 'node:crypto';
import { initializeApp, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { createSiteService } from '@/lib/server/sites';

const suite = process.env.FIRESTORE_EMULATOR_HOST ? describe : describe.skip;
suite('transactional draft persistence', () => {
  let app: ReturnType<typeof initializeApp>;
  let db: ReturnType<typeof getFirestore>;
  let service: ReturnType<typeof createSiteService>;
  const input = { category: 'barbershop', language: 'he' };
  beforeAll(() => {
    expect(process.env.FIREBASE_PROJECT_ID).toBe('demo-siteforge');
    expect(process.env.FIRESTORE_EMULATOR_HOST).toMatch(/^(127\.0\.0\.1|localhost):\d+$/);
    app = initializeApp({ projectId: 'demo-siteforge' }, randomUUID());
    db = getFirestore(app); service = createSiteService(db);
  });
  afterAll(async () => { if (app) await deleteApp(app); });
  it('allows only one site under concurrent different keys', async () => {
    const uid = randomUUID();
    const results = await Promise.allSettled(['a', 'b'].map(key => service.create(uid, input, key)));
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect(results.find(r => r.status === 'rejected')).toMatchObject({ reason: { code: 'LIMIT_REACHED' } });
    expect(await service.list(uid)).toHaveLength(1);
  });
  it('replays concurrent identical keys and rejects changed payloads', async () => {
    const uid = randomUUID();
    const results = await Promise.all([service.create(uid, input, 'same'), service.create(uid, input, 'same')]);
    expect(results[0]).toEqual(results[1]);
    expect(results[0].draft.facts.services).toEqual([]);
    expect(results[0].draft.facts.openingHours.every(d => d.value === null)).toBe(true);
    await expect(service.create(uid, { ...input, language: 'en' }, 'same')).rejects.toMatchObject({ code: 'IDEMPOTENCY_CONFLICT' });
  });
  it('one concurrent save wins and reload returns exactly the winning revision', async () => {
    const uid = randomUUID(), site = await service.create(uid, input, 'create');
    const results = await Promise.allSettled(['First', 'Second'].map(businessName => service.saveDraft(uid, site.id, {
      expectedRevision: 0, intake: { ...site.draft, facts: { ...site.draft.facts, businessName } },
    })));
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect(results.find(r => r.status === 'rejected')).toMatchObject({ reason: { code: 'REVISION_CONFLICT' } });
    const winner = results.find(r => r.status === 'fulfilled');
    expect((await service.get(uid, site.id)).site).toEqual(winner?.status === 'fulfilled' ? winner.value : null);
    await expect(service.saveDraft(uid, site.id, { expectedRevision: 0, intake: site.draft })).rejects.toMatchObject({ code: 'REVISION_CONFLICT' });
  });
  it('rejects foreign ownership for reads, updates and deletion', async () => {
    const uid = randomUUID(), site = await service.create(uid, input, 'create');
    await expect(service.get('other', site.id)).rejects.toMatchObject({ status: 404 });
    await expect(service.saveDraft('other', site.id, { expectedRevision: 0, intake: site.draft })).rejects.toMatchObject({ status: 404 });
    await expect(service.remove('other', site.id, 0)).rejects.toMatchObject({ status: 404 });
    expect(await service.list('other')).toEqual([]);
  });
  it('blocks active jobs and suspended sites', async () => {
    const uid = randomUUID(), site = await service.create(uid, input, 'create');
    const jobId = randomUUID();
    await db.doc(`sites/${site.id}`).update({ activeJobId: jobId });
    await db.doc(`generationJobs/${jobId}`).set({ state: 'queued', ownerUid: uid, siteId: site.id });
    await expect(service.saveDraft(uid, site.id, { expectedRevision: 0, intake: site.draft })).rejects.toMatchObject({ code: 'JOB_ACTIVE' });
    await db.doc(`sites/${site.id}`).update({ activeJobId: null, suspended: true });
    await expect(service.saveDraft(uid, site.id, { expectedRevision: 0, intake: site.draft })).rejects.toMatchObject({ status: 404 });
  });
  it('rejects unattached, foreign, unready and unconfirmed assets', async () => {
    const uid = randomUUID(), site = await service.create(uid, input, 'create'), assetId = randomUUID();
    const intake = { ...site.draft, imageAssetIds: [assetId], rightsConfirmed: true };
    const save = () => service.saveDraft(uid, site.id, { expectedRevision: 0, intake });
    await expect(save()).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    await db.doc(`assets/${assetId}`).set({ ownerUid: 'foreign', siteId: site.id, status: 'ready' });
    await expect(save()).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    await db.doc(`assets/${assetId}`).update({ ownerUid: uid, status: 'reserved' });
    await expect(save()).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    await db.doc(`assets/${assetId}`).update({ status: 'ready' });
    await expect(service.saveDraft(uid, site.id, { expectedRevision: 0, intake: { ...intake, rightsConfirmed: false } })).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    expect((await save()).draftRevision).toBe(1);
  });
  it('soft deletion unpublishes, cancels work and retains account lock', async () => {
    const uid = randomUUID(), site = await service.create(uid, input, 'create'), jobId = randomUUID();
    const slug = `test-${randomUUID()}`;
    await db.doc(`sites/${site.id}`).update({ slug, activeJobId: jobId });
    await db.doc(`publicSites/${slug}`).set({ siteId: site.id });
    await db.doc(`generationJobs/${jobId}`).set({ state: 'generating', leaseToken: 'old' });
    await expect(service.remove(uid, site.id, 1)).rejects.toMatchObject({ code: 'REVISION_CONFLICT' });
    await service.remove(uid, site.id, 0);
    expect((await db.doc(`publicSites/${slug}`).get()).exists).toBe(false);
    expect((await db.doc(`generationJobs/${jobId}`).get()).get('state')).toBe('cancelled');
    await expect(service.get(uid, site.id)).rejects.toMatchObject({ status: 404 });
    await expect(service.create(uid, input, 'new')).rejects.toMatchObject({ code: 'LIMIT_REACHED' });
  });
});
