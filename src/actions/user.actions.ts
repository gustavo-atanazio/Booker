'use server';

import { apiPost, apiPatch, apiDelete } from '@/services/api';
import { getAccessToken } from '@/lib/auth/cookies';
import { revalidatePath } from 'next/cache';
import type { ActionResult } from '@/actions/auth.actions';
import type { ApiResponse } from '@/lib/types/api.types';
import { ApiErrorCode } from '@/lib/types/api.types';
import type { CreateUserDTO, UpdateUserDTO } from '@/lib/types/user.types';

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
  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteUserAction(id: string): Promise<ActionResult> {
  const headers = await getAuthHeaders();
  const response = await apiDelete(`/users/${id}`, { headers });
  if (!response.success) return handleApiError(response);
  revalidatePath('/admin/users');
  return { success: true };
}
