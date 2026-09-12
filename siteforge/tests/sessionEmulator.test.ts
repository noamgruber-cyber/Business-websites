import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getAdminAuth } from '@/lib/server/firebaseAdmin';
import { createSessionService } from '@/lib/server/session';

const emulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const projectId = process.env.FIREBASE_PROJECT_ID;
const describeEmulator = emulatorHost && projectId ? describe : describe.skip;

describeEmulator('Firebase Auth emulator session integration', () => {
  let uid = '';
  let idToken = '';
  let sessionCookie = '';

  beforeAll(async () => {
    const response = await fetch(
      `http://${emulatorHost}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `session-${crypto.randomUUID()}@example.test`,
          password: 'emulator-password-123',
          returnSecureToken: true,
        }),
      },
    );
    const payload = (await response.json()) as { localId: string; idToken: string };
    expect(response.ok).toBe(true);
    uid = payload.localId;
    idToken = payload.idToken;
  });

  afterAll(async () => {
    if (uid) await getAdminAuth().deleteUser(uid).catch(() => undefined);
  });

  it('exchanges and verifies a real emulator token and session cookie', async () => {
    const service = createSessionService();
    const result = await service.exchange(
      new Request('http://localhost/api/session', {
        method: 'POST',
        headers: { origin: 'http://localhost', authorization: `Bearer ${idToken}` },
      }),
    );
    sessionCookie = result.cookie;
    expect(result.uid).toBe(uid);

    const decoded = await service.verify(
      new Request('http://localhost/api/private', {
        headers: { cookie: `siteforge_session=${encodeURIComponent(sessionCookie)}` },
      }),
    );
    expect(decoded.uid).toBe(uid);
  });

  it('rejects a fake token through the emulator-backed Admin SDK', async () => {
    await expect(
      createSessionService().exchange(
        new Request('http://localhost/api/session', {
          method: 'POST',
          headers: { origin: 'http://localhost', authorization: 'Bearer fake-token' },
        }),
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHENTICATED', status: 401 });
  });

  it('rejects a session after the emulator disables its user', async () => {
    expect(sessionCookie).not.toBe('');
    await getAdminAuth().updateUser(uid, { disabled: true });
    await expect(
      createSessionService().verify(
        new Request('http://localhost/api/private', {
          headers: { cookie: `siteforge_session=${encodeURIComponent(sessionCookie)}` },
        }),
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHENTICATED', status: 401 });
  });
});
