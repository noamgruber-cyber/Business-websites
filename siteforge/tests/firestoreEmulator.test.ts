import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { initializeApp, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const project = 'demo-siteforge';
const host = process.env.FIRESTORE_EMULATOR_HOST;
const authHost = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const suite = host && authHost ? describe : describe.skip;
const paths = [
  'ownerAccounts/owner-a', 'sites/site-a', 'sites/site-a/versions/version-a',
  'assets/asset-a', 'generationJobs/job-a', 'siteSlugs/example',
  'publicSites/example', 'operationKeys/key-a', 'generationUsage/owner-a_today',
  'platformUsage/today', 'auditEvents/event-a', 'uploadUsage/owner-a_hour',
  'uploadReservations/asset-a',
];

suite('private Firestore emulator boundary', () => {
  const appName = `storage-tests-${crypto.randomUUID()}`;
  let app: ReturnType<typeof initializeApp>;
  let token: string;
  const base = `http://${host}/v1/projects/${project}/databases/(default)/documents`;

  beforeAll(async () => {
    // Fail before network access if someone accidentally points tests at a live project.
    expect(process.env.FIREBASE_PROJECT_ID).toBe(project);
    expect(host).toMatch(/^(127\.0\.0\.1|localhost):\d+$/);
    expect(authHost).toMatch(/^(127\.0\.0\.1|localhost):\d+$/);
    app = initializeApp({ projectId: project }, appName);
    const response = await fetch(`http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true }),
    });
    expect(response.ok).toBe(true);
    token = (await response.json()).idToken;
    expect(token).toBeTruthy();
    const db = getFirestore(app);
    const batch = db.batch();
    for (const path of paths) batch.set(db.doc(path), { ownerUid: 'owner-a', marker: 'private' });
    await batch.commit();
    expect((await db.doc('sites/site-a').get()).get('marker')).toBe('private');
  });

  afterAll(async () => { if (app) await deleteApp(app); });

  for (const path of paths) {
    for (const identity of ['anonymous', 'signed-in'] as const) {
      it(`${identity} cannot read, list, create, update or delete ${path}`, async () => {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (identity === 'signed-in') headers.Authorization = `Bearer ${token}`;
        const collection = path.slice(0, path.lastIndexOf('/'));
        for (const [method, target] of [
          ['GET', path], ['GET', collection], ['PATCH', `${path}-new`],
          ['PATCH', path], ['DELETE', path],
        ]) {
          const response = await fetch(`${base}/${target}`, {
            method, headers,
            ...(method === 'PATCH' ? { body: JSON.stringify({ fields: { marker: { stringValue: 'changed' } } }) } : {}),
          });
          expect(response.status, `${identity} ${method} ${target}`).toBe(403);
          expect((await response.json()).error.status).toBe('PERMISSION_DENIED');
        }
      });
    }
  }
});
