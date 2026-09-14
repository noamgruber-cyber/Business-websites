import { afterEach, expect, it, vi } from 'vitest';
afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });
it('imports Firebase-dependent modules without creating a client when settings are absent', async () => {
  for (const name of ['API_KEY', 'AUTH_DOMAIN', 'PROJECT_ID', 'APP_ID']) vi.stubEnv(`NEXT_PUBLIC_FIREBASE_${name}`, undefined);
  vi.resetModules();
  const client = await import('../lib/firebase');
  expect(client.isFirebaseConfigured()).toBe(false);
  await expect(import('../lib/firestore')).resolves.toBeDefined();
  await expect(import('../lib/analytics')).resolves.toBeDefined();
  const auth = await import('../lib/firebaseAuth');
  expect(() => auth.getFirebaseAuth()).toThrow('FIREBASE_CLIENT_NOT_CONFIGURED');
  expect(() => client.getClientFirestore()).toThrow('FIREBASE_CLIENT_NOT_CONFIGURED');
});
it('reuses the configured Firebase application and database', async () => {
  for (const [name, value] of Object.entries({ API_KEY: 'synthetic-key', AUTH_DOMAIN: 'test.example', PROJECT_ID: 'demo-siteforge-config', APP_ID: 'synthetic-id' })) vi.stubEnv(`NEXT_PUBLIC_FIREBASE_${name}`, value);
  vi.resetModules();
  const client = await import('../lib/firebase');
  expect(client.isFirebaseConfigured()).toBe(true);
  expect(client.getFirebaseApp()).toBe(client.getFirebaseApp());
  expect(client.getClientFirestore()).toBe(client.getClientFirestore());
  const { deleteApp } = await import('firebase/app');
  await deleteApp(client.getFirebaseApp());
});
