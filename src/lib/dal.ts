import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getAccessToken, getUserProfile } from '@/lib/auth/cookies';
import { decodeJwtPayload } from '@/lib/auth/jwt';
import type { UserDTO, UserRole } from '@/lib/types/auth.types';

async function resolveUser(): Promise<UserDTO | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const payload = decodeJwtPayload(accessToken);
  if (!payload?.role) return null;

  const profile = await getUserProfile();
  if (!profile) return null;

  return { ...profile, role: payload.role as UserRole };
}

export const verifySession = cache(async (): Promise<UserDTO> => {
  const user = await resolveUser();
  if (!user) redirect('/login');
  return user;
});

export const getUser = cache(async (): Promise<UserDTO | null> => {
  return await resolveUser();
});

export const verifyAdmin = cache(async (): Promise<UserDTO> => {
  const user = await verifySession();
  if (user.role !== 'ADMIN') redirect('/profile');
  return user;
});
