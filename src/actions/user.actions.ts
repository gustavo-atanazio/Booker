'use server';

import { apiPost, apiPatch, apiDelete } from '@/services/api';
import { getAccessToken, getUserProfile, updateUserProfileCookie } from '@/lib/auth/cookies';
import { revalidatePath } from 'next/cache';
import type { ActionResult } from '@/actions/auth.actions';
import type { ApiResponse } from '@/lib/types/api.types';
import { ApiErrorCode } from '@/lib/types/api.types';
import type { CreateUserDTO, UpdateUserDTO, UpdatePasswordDTO } from '@/lib/types/user.types';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleApiError(response: ApiResponse<unknown>): ActionResult {
  const code = response.error?.code ?? ApiErrorCode.DEFAULT;
  const fieldErrors = response.error?.fieldErrors
    ? Object.fromEntries(
        Object.entries(response.error.fieldErrors).map(([k, v]) => [k, [v]])
      )
    : undefined;

  return {
    success: false,
    error: { code, message: response.error?.message, fieldErrors },
  };
}

export async function createUserAction(data: CreateUserDTO): Promise<ActionResult> {
  const headers = await getAuthHeaders();
  const response = await apiPost('/users', data, { headers });
  if (!response.success) return handleApiError(response);
  revalidatePath('/admin/users');
  return { success: true };
}

export async function updateUserAction(
  id: string,
  data: UpdateUserDTO
): Promise<ActionResult> {
  const headers = await getAuthHeaders();
  const response = await apiPatch(`/users/${id}`, data, { headers });
  if (!response.success) return handleApiError(response);

  // If the updated user is the currently logged-in user, update session cookie
  const currentProfile = await getUserProfile();
  if (currentProfile && currentProfile.id === id) {
    await updateUserProfileCookie({
      ...(data.name ? { name: data.name } : {}),
      ...(data.username ? { username: data.username } : {}),
      ...(data.email ? { email: data.email } : {}),
      ...(data.bio !== undefined ? { bio: data.bio } : {}),
    });
  }

  revalidatePath('/admin/users');
  revalidatePath('/profile');
  revalidatePath('/profile/edit');
  return { success: true };
}

export async function updatePasswordAction(
  id: string,
  data: UpdatePasswordDTO
): Promise<ActionResult> {
  const headers = await getAuthHeaders();
  const response = await apiPatch(`/users/${id}/password`, data, { headers });
  if (!response.success) return handleApiError(response);
  return { success: true };
}

export async function deleteUserAction(id: string): Promise<ActionResult> {
  const headers = await getAuthHeaders();
  const response = await apiDelete(`/users/${id}`, { headers });
  if (!response.success) return handleApiError(response);
  revalidatePath('/admin/users');
  revalidatePath('/profile');
  return { success: true };
}
