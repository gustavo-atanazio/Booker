import { cookies } from 'next/headers';
import { AuthenticationResponseDTO, UserDTO } from '@/lib/types/auth.types';
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  USER_DATA_NAME,
  COOKIE_OPTIONS,
  THIRTY_DAYS,
} from './constants';

export async function setAuthCookies(authResponse: AuthenticationResponseDTO) {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_NAME, authResponse.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: authResponse.expiresIn,
  });

  cookieStore.set(REFRESH_TOKEN_NAME, authResponse.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: THIRTY_DAYS,
  });

  cookieStore.set(USER_DATA_NAME, JSON.stringify(authResponse.user), {
    ...COOKIE_OPTIONS,
    maxAge: THIRTY_DAYS,
  });
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_NAME)?.value ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_NAME)?.value ?? null;
}

export async function getUserData(): Promise<UserDTO | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get(USER_DATA_NAME)?.value;

  if (!userData) return null;

  try {
    return JSON.parse(userData) as UserDTO;
  } catch {
    return null;
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
  cookieStore.delete(USER_DATA_NAME);
}
