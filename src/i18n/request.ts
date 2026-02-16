import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messages = {
    ...(await import(`./messages/${locale}/common.json`)).default,
    ...(await import(`./messages/${locale}/landing.json`)).default,
    ...(await import(`./messages/${locale}/login.json`)).default,
    ...(await import(`./messages/${locale}/signup.json`)).default,
    ...(await import(`./messages/${locale}/dashboard.json`)).default,
    ...(await import(`./messages/${locale}/admin.json`)).default
  };

  return {
    locale,
    messages
  };
});
