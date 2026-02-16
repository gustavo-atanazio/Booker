import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  USER_PROFILE_NAME,
} from '@/lib/auth/constants';
import { decodeJwtPayload } from '@/lib/auth/jwt';

const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const adminRoutes = ['/admin'];
const authRoutes = ['/login', '/signup'];

// Optimistic check: only verifies cookie existence and JWT claims, no API calls.
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
  const isAdminRoute = adminRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );
  const isAuth = authRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  if ((isProtected || isAdminRoute) && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((isProtected || isAdminRoute) && !request.cookies.has(USER_PROFILE_NAME)) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(ACCESS_TOKEN_NAME);
    response.cookies.delete(REFRESH_TOKEN_NAME);
    return response;
  }

  if (isAdminRoute) {
    const role = getUserRoleFromToken(request);
    if (role !== 'ADMIN') {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url)
      );
    }
  }

  if (isAuth && isAuthenticated) {
    const redirectTo = request.nextUrl.searchParams.get('redirect');
    const isSafePath =
      redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//');
    const redirectUrl = isSafePath
      ? new URL(redirectTo, request.url)
      : new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return null;
}

function getUserRoleFromToken(request: NextRequest): string | null {
  const accessToken = request.cookies.get(ACCESS_TOKEN_NAME)?.value;
  if (!accessToken) return null;

  const payload = decodeJwtPayload(accessToken);
  return payload?.role ?? null;
}
