export const ACCESS_TOKEN_NAME = 'access_token';
export const REFRESH_TOKEN_NAME = 'refresh_token';
export const USER_PROFILE_NAME = 'user_profile';
export const THIRTY_DAYS = 30 * 24 * 60 * 60;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === 'true',
  sameSite: 'lax' as const,
  path: '/',
  domain: process.env.COOKIE_DOMAIN,
};
