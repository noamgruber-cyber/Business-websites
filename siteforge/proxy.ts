import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/create', '/edit', '/dashboard', '/studio'];

export function proxy(request: NextRequest) {
  // New hosted previews stay closed until deployment protection and staging
  // configuration have been verified. This is a setup lock, not user auth.
  if (process.env.VERCEL_ENV === 'preview' && process.env.SITEFORGE_PREVIEW_UNLOCKED !== 'true') {
    return new NextResponse('SiteForge preview setup is in progress.', {
      status: 503,
      headers: { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' },
    });
  }
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const sessionCookie = request.cookies.get('siteforge_session');
    const legacyHint = request.cookies.get('siteforge_auth');
    if (!sessionCookie?.value && !legacyHint?.value) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
