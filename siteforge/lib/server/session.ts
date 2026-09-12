import type { Auth, DecodedIdToken } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';
import type { ApiErrorCode, ApiResult } from '../siteContracts';
import { getAdminAuth } from './firebaseAdmin';

export const SESSION_COOKIE = 'siteforge_session';
export const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;
const TOKEN_FRESHNESS_SECONDS = 5 * 60;

export class SessionError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'SessionError';
  }
}

type SessionAuth = Pick<Auth, 'verifyIdToken' | 'createSessionCookie' | 'verifySessionCookie'>;

function bearerToken(request: Request): string {
  const authorization = request.headers.get('authorization');
  const match = authorization?.match(/^Bearer ([^\s]+)$/);
  if (!match) throw new SessionError('UNAUTHENTICATED', 401, 'A Firebase ID token is required');
  return match[1];
}

function cookieValue(request: Request, name: string): string | null {
  const header = request.headers.get('cookie');
  if (!header) return null;

  for (const pair of header.split(';')) {
    const separator = pair.indexOf('=');
    if (separator === -1) continue;
    const key = pair.slice(0, separator).trim();
    if (key === name) return decodeURIComponent(pair.slice(separator + 1).trim());
  }
  return null;
}

export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get('origin');
  let expected: string;
  try {
    expected = new URL(request.url).origin;
  } catch {
    throw new SessionError('INVALID_INPUT', 400, 'Invalid request URL');
  }

  if (!origin || origin !== expected) {
    throw new SessionError('INVALID_INPUT', 403, 'Cross-origin mutations are not allowed');
  }
}

function assertFreshToken(decoded: DecodedIdToken, nowSeconds: number): void {
  if (
    typeof decoded.auth_time !== 'number' ||
    decoded.auth_time > nowSeconds + 60 ||
    nowSeconds - decoded.auth_time > TOKEN_FRESHNESS_SECONDS
  ) {
    throw new SessionError('UNAUTHENTICATED', 401, 'Recent sign-in is required');
  }
}

export function createSessionService(
  auth: SessionAuth = getAdminAuth(),
  now: () => number = Date.now,
) {
  return {
    async exchange(request: Request): Promise<{ cookie: string; uid: string }> {
      assertSameOrigin(request);
      const idToken = bearerToken(request);
      let decoded: DecodedIdToken;
      try {
        decoded = await auth.verifyIdToken(idToken, true);
      } catch {
        throw new SessionError('UNAUTHENTICATED', 401, 'The Firebase ID token is invalid');
      }
      assertFreshToken(decoded, Math.floor(now() / 1000));

      try {
        const cookie = await auth.createSessionCookie(idToken, { expiresIn: SESSION_DURATION_MS });
        return { cookie, uid: decoded.uid };
      } catch {
        throw new SessionError('UNAUTHENTICATED', 401, 'Could not create a verified session');
      }
    },

    async verify(request: Request): Promise<DecodedIdToken> {
      const sessionCookie = cookieValue(request, SESSION_COOKIE);
      if (!sessionCookie) throw new SessionError('UNAUTHENTICATED', 401, 'A verified session is required');
      try {
        return await auth.verifySessionCookie(sessionCookie, true);
      } catch {
        throw new SessionError('UNAUTHENTICATED', 401, 'The session is invalid or expired');
      }
    },
  };
}

export function apiResponse<T>(
  result: ApiResult<T>,
  status: number,
): NextResponse<ApiResult<T>> {
  const response = NextResponse.json(result, { status });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export function apiSuccess<T>(data: T, status = 200, requestId = crypto.randomUUID()) {
  return apiResponse<T>({ ok: true, data, requestId }, status);
}

export function apiFailure(error: unknown, requestId = crypto.randomUUID()) {
  if (error instanceof SessionError) {
    return apiResponse<never>(
      { ok: false, error: { code: error.code, message: error.message }, requestId },
      error.status,
    );
  }
  return apiResponse<never>(
    {
      ok: false,
      error: { code: 'SERVICE_UNAVAILABLE', message: 'Service is unavailable' },
      requestId,
    },
    503,
  );
}
