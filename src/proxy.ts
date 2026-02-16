import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { handleAuth } from './proxy/auth';

const intlMiddleware = createIntlMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeMatch = routing.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  const pathnameWithoutLocale = localeMatch
    ? pathname.replace(`/${localeMatch}`, '') || '/'
    : pathname;
  const locale = localeMatch || routing.defaultLocale;

  const authResponse = handleAuth(request, pathnameWithoutLocale, locale);
  if (authResponse) return authResponse;

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)',],
};
