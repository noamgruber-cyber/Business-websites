import type { Auth, DecodedIdToken } from 'firebase-admin/auth';
import { describe, expect, it, vi } from 'vitest';
import {
  createSessionService,
  SESSION_DURATION_MS,
  SessionError,
} from '@/lib/server/session';

const now = 1_800_000_000_000;
const nowSeconds = Math.floor(now / 1000);

function decoded(overrides: Partial<DecodedIdToken> = {}): DecodedIdToken {
  return {
    aud: 'siteforge-test',
    auth_time: nowSeconds - 30,
    exp: nowSeconds + 3600,
    firebase: { identities: {}, sign_in_provider: 'google.com' },
    iat: nowSeconds - 30,
    iss: 'https://securetoken.google.com/siteforge-test',
    sub: 'owner-1',
    uid: 'owner-1',
    ...overrides,
  };
}

function fakeAuth(overrides: Partial<Auth> = {}) {
  return {
    verifyIdToken: vi.fn().mockResolvedValue(decoded()),
    createSessionCookie: vi.fn().mockResolvedValue('signed-session'),
    verifySessionCookie: vi.fn().mockResolvedValue(decoded()),
    ...overrides,
  } as unknown as Auth;
}

function request(path = '/api/session', init: RequestInit = {}) {
  return new Request(`https://siteforge.test${path}`, init);
}

describe('session exchange', () => {
  it('creates a five-day session from a fresh verified ID token', async () => {
    const auth = fakeAuth();
    const result = await createSessionService(auth, () => now).exchange(
      request('/api/session', {
        method: 'POST',
        headers: { origin: 'https://siteforge.test', authorization: 'Bearer fresh-token' },
      }),
    );

    expect(result).toEqual({ cookie: 'signed-session', uid: 'owner-1' });
    expect(auth.verifyIdToken).toHaveBeenCalledWith('fresh-token', true);
    expect(auth.createSessionCookie).toHaveBeenCalledWith('fresh-token', {
      expiresIn: SESSION_DURATION_MS,
    });
  });

  it('rejects missing and fake tokens', async () => {
    const service = createSessionService(fakeAuth(), () => now);
    await expect(
      service.exchange(request('/api/session', { method: 'POST', headers: { origin: 'https://siteforge.test' } })),
    ).rejects.toMatchObject({ code: 'UNAUTHENTICATED', status: 401 });

    const invalid = fakeAuth({ verifyIdToken: vi.fn().mockRejectedValue(new Error('wrong project')) });
    await expect(
      createSessionService(invalid, () => now).exchange(
        request('/api/session', {
          method: 'POST',
          headers: { origin: 'https://siteforge.test', authorization: 'Bearer wrong-project' },
        }),
      ),
    ).rejects.toBeInstanceOf(SessionError);
  });

  it('requires recent authentication', async () => {
    const auth = fakeAuth({
      verifyIdToken: vi.fn().mockResolvedValue(decoded({ auth_time: nowSeconds - 301 })),
    });
    await expect(
      createSessionService(auth, () => now).exchange(
        request('/api/session', {
          method: 'POST',
          headers: { origin: 'https://siteforge.test', authorization: 'Bearer stale-token' },
        }),
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHENTICATED', status: 401 });
  });

  it('rejects a foreign or missing Origin', async () => {
    const service = createSessionService(fakeAuth(), () => now);
    for (const origin of [undefined, 'https://evil.example']) {
      const headers: Record<string, string> = { authorization: 'Bearer token' };
      if (origin) headers.origin = origin;
      await expect(
        service.exchange(request('/api/session', { method: 'POST', headers })),
      ).rejects.toMatchObject({ status: 403 });
    }
  });
});

describe('session verification', () => {
  it('derives the owner UID from a revocation-checked session', async () => {
    const auth = fakeAuth();
    const result = await createSessionService(auth).verify(
      request('/api/private', { headers: { cookie: 'other=1; siteforge_session=signed-session' } }),
    );
    expect(result.uid).toBe('owner-1');
    expect(auth.verifySessionCookie).toHaveBeenCalledWith('signed-session', true);
  });

  it('rejects absent, expired and invalid sessions', async () => {
    await expect(createSessionService(fakeAuth()).verify(request('/api/private'))).rejects.toMatchObject({
      code: 'UNAUTHENTICATED',
      status: 401,
    });

    const expired = fakeAuth({ verifySessionCookie: vi.fn().mockRejectedValue(new Error('expired')) });
    await expect(
      createSessionService(expired).verify(
        request('/api/private', { headers: { cookie: 'siteforge_session=expired' } }),
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHENTICATED', status: 401 });
  });
});
