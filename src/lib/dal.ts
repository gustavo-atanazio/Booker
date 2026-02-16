import { cache } from 'react';
import { redirect } from 'next/navigation';
import {
  getAccessToken,
  getRefreshToken,
  getUserData,
} from '@/lib/auth/cookies';
import { UserDTO } from '@/lib/types/auth.types';

// Redirects to /login if no valid session. Cached per request.
export const verifySession = cache(async (): Promise<UserDTO> => {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  if (!accessToken && !refreshToken) {
    redirect('/login');
  }

  const user = await getUserData();
  if (!user) {
    redirect('/login');
  }

  return user;
});

// Returns null if not authenticated. Cached per request.
export const getUser = cache(async (): Promise<UserDTO | null> => {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  if (!accessToken && !refreshToken) return null;

  return await getUserData();
});
