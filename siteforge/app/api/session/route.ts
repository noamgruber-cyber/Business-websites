import {
  apiFailure,
  apiSuccess,
  assertSameOrigin,
  createSessionService,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
} from '@/lib/server/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const decoded = await createSessionService().verify(request);
    return apiSuccess({ authenticated: true, uid: decoded.uid });
  } catch (error) {
    return apiFailure(error);
  }
}

export async function POST(request: Request) {
  try {
    const { cookie, uid } = await createSessionService().exchange(request);
    const response = apiSuccess({ authenticated: true, uid });
    response.cookies.set(SESSION_COOKIE, cookie, {
      httpOnly: true,
      secure: new URL(request.url).protocol === 'https:',
      sameSite: 'lax',
      path: '/',
      maxAge: Math.floor(SESSION_DURATION_MS / 1000),
    });
    return response;
  } catch (error) {
    return apiFailure(error);
  }
}

export async function DELETE(request: Request) {
  try {
    assertSameOrigin(request);
    const response = apiSuccess({ authenticated: false });
    response.cookies.set(SESSION_COOKIE, '', {
      httpOnly: true,
      secure: new URL(request.url).protocol === 'https:',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return response;
  } catch (error) {
    return apiFailure(error);
  }
}
