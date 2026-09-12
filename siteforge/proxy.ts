import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/create', '/edit', '/dashboard', '/studio'];

export function proxy(request: NextRequest) {
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
  matcher: ['/create', '/edit/:path*', '/dashboard/:path*'],
};
