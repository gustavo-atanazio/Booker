import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from '@/lib/auth/constants';

const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const authRoutes = ['/login', '/signup'];

// Optimistic check: only verifies cookie existence, no API calls.
// Actual validation happens in the DAL (verifySession/getUser).
export function handleAuth(
  request: NextRequest,
  pathnameWithoutLocale: string,
  locale: string
): NextResponse | null {
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_NAME);
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_NAME);
  const isAuthenticated = hasAccessToken || hasRefreshToken;

  const isProtected = protectedRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );
  const isAuth = authRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuth && isAuthenticated) {
    const redirectTo = request.nextUrl.searchParams.get('redirect');
    const redirectUrl = redirectTo
      ? new URL(redirectTo, request.url)
      : new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return null;
}
