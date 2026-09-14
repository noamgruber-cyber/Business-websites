import type { User } from 'firebase/auth';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { clearServerSession, ensureServerSession } from '@/context/AuthContext';

afterEach(() => {
  vi.unstubAllGlobals();
});

function user(token = 'fresh-id-token') {
  return { getIdToken: vi.fn().mockResolvedValue(token) } as unknown as User;
}

describe('client session bridge', () => {
  it('reuses a valid server session after reload', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const currentUser = user();

    await ensureServerSession(currentUser);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/session', expect.objectContaining({ method: 'GET' }));
    expect(currentUser.getIdToken).not.toHaveBeenCalled();
  });

  it('exchanges a Firebase ID token when no server session exists', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const currentUser = user();

    await ensureServerSession(currentUser);

    expect(currentUser.getIdToken).toHaveBeenCalledWith(false);
    expect(fetchMock).toHaveBeenLastCalledWith(
      '/api/session',
      expect.objectContaining({
        method: 'POST',
        headers: { Authorization: 'Bearer fresh-id-token' },
      }),
    );
  });

  it('forces a fresh token after an interactive login', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const currentUser = user();

    await ensureServerSession(currentUser, true);

    expect(currentUser.getIdToken).toHaveBeenCalledWith(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('surfaces reauthentication when exchange is rejected', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(new Response(null, { status: 401 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(ensureServerSession(user())).rejects.toThrow('SERVER_SESSION_EXCHANGE_FAILED');
  });

  it('clears the server cookie through the protected endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await clearServerSession();

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/session',
      expect.objectContaining({ method: 'DELETE', credentials: 'same-origin' }),
    );
  });
});
