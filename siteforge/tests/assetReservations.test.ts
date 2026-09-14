import { randomUUID } from 'node:crypto';
import { initializeApp, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { createSiteService } from '@/lib/server/sites';
import { createAssetService } from '@/lib/server/assets';
const suite = process.env.FIRESTORE_EMULATOR_HOST ? describe : describe.skip;
suite('transactional asset reservations', () => {
  let app: ReturnType<typeof initializeApp>, db: ReturnType<typeof getFirestore>;
  let tick: number;
  const input = { role: 'logo', mime: 'image/png', bytes: 100, fileName: 'photo.png' };
  beforeAll(() => {
    expect(process.env.FIREBASE_PROJECT_ID).toBe('demo-siteforge');
    expect(process.env.FIRESTORE_EMULATOR_HOST).toMatch(/^(127\.0\.0\.1|localhost):\d+$/);
    app = initializeApp({ projectId: 'demo-siteforge' }, randomUUID()); db = getFirestore(app);
  });
  afterAll(async () => { if (app) await deleteApp(app); });
  async function fixture() {
    tick = Date.UTC(2026, 8, 12, 10);
    const uid = randomUUID();
    const site = await createSiteService(db).create(uid, { category: 'gym', language: 'en' }, 'create');
    return { uid, id: site.id, assets: createAssetService(db, () => tick) };
  }
  it('concurrent requests cannot reserve the same role twice', async () => {
    const { uid, id, assets } = await fixture();
    const results = await Promise.allSettled(['a', 'b'].map(k => assets.reserve(uid, id, input, k)));
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect(results.find(r => r.status === 'rejected')).toMatchObject({ reason: { code: 'LIMIT_REACHED' } });
  });
  it('replays without charging twice and rejects changed or expired keys', async () => {
    const { uid, id, assets } = await fixture();
    const result = await assets.reserve(uid, id, input, 'key');
    expect(await assets.reserve(uid, id, input, 'key')).toEqual(result);
    await expect(assets.reserve(uid, id, { ...input, bytes: 101 }, 'key')).rejects.toMatchObject({ code: 'IDEMPOTENCY_CONFLICT' });
    tick += 15 * 60 * 1000;
    await expect(assets.reserve(uid, id, input, 'key')).rejects.toMatchObject({ code: 'UPLOAD_REJECTED' });
    expect((await assets.reserve(uid, id, input, 'new')).assetId).not.toBe(result.assetId);
  });
  it('caps gallery and total slots at six and eight', async () => {
    const { uid, id, assets } = await fixture();
    await assets.reserve(uid, id, input, 'logo');
    await assets.reserve(uid, id, { ...input, role: 'cover' }, 'cover');
    for (let i = 0; i < 6; i++) await assets.reserve(uid, id, { ...input, role: 'gallery' }, `g${i}`);
    await expect(assets.reserve(uid, id, { ...input, role: 'gallery' }, 'overflow')).rejects.toMatchObject({ code: 'LIMIT_REACHED' });
  });
  it('enforces hourly request and byte limits and resets the UTC hour', async () => {
    const { uid, id, assets } = await fixture();
    const usage = db.doc(`uploadUsage/${uid}_2026-09-12T10`);
    await usage.set({ requests: 20, reservedBytes: 0, acceptedBytes: 0 });
    await expect(assets.reserve(uid, id, input, 'requests')).rejects.toMatchObject({ code: 'LIMIT_REACHED' });
    await usage.set({ requests: 1, reservedBytes: 60 * 1024 * 1024, acceptedBytes: 0 });
    await expect(assets.reserve(uid, id, input, 'bytes')).rejects.toMatchObject({ code: 'LIMIT_REACHED' });
    tick += 60 * 60 * 1000;
    expect((await assets.reserve(uid, id, input, 'next-hour')).assetId).toBeTruthy();
  });
  it('rejects another owner and oversized announced files', async () => {
    const { uid, id, assets } = await fixture();
    await expect(assets.reserve('foreign', id, input, 'foreign')).rejects.toMatchObject({ status: 404 });
    await expect(assets.reserve(uid, id, { ...input, bytes: 3 * 1024 * 1024 + 1 }, 'large')).rejects.toMatchObject({ code: 'INVALID_INPUT' });
  });
});
