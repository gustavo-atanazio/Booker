'use server';

import { apiPost } from '@/services/api';
import {
  setAuthCookies,
  clearAuthCookies,
  getRefreshToken,
} from '@/lib/auth/cookies';
import type {
  LoginRequestDTO,
  RegisterRequestDTO,
  AuthenticationResponseDTO,
} from '@/lib/types/auth.types';
import { redirect } from 'next/navigation';
import type { ApiResponse } from '@/lib/types/api.types';
import { ApiErrorCode, SECURITY_SENSITIVE_CODES } from '@/lib/types/api.types';

export type ActionResult = {
  error?: {
    code?: string;
    message?: string;
    fieldErrors?: Record<string, string[]>;
    meta?: Record<string, string | number>;
  };
  success: boolean;
};

function transformFieldErrors(
  apiErrors?: Record<string, string>
): Record<string, string[]> | undefined {
  return apiErrors
    ? Object.fromEntries(
        Object.entries(apiErrors).map(([key, value]) => [key, [value]])
      )
    : undefined;
}

function maskSecuritySensitiveCode(code: string): string {
  if (SECURITY_SENSITIVE_CODES.includes(code as ApiErrorCode)) {
    return ApiErrorCode.VALIDATION_ERROR;
  }
  return code;
}

function handleApiError(
  response: ApiResponse<unknown>,
  maskSensitive: boolean
): ActionResult {
  const code = response.error?.code ?? ApiErrorCode.DEFAULT;

  return {
    error: {
      code: maskSensitive ? maskSecuritySensitiveCode(code) : code,
      message: response.error?.message,
      fieldErrors: transformFieldErrors(response.error?.fieldErrors),
      meta: response.error?.meta as Record<string, string | number> | undefined,
    },
    success: false,
  };
}

export async function loginAction(
  credentials: LoginRequestDTO,
  redirectTo?: string
): Promise<ActionResult> {
  const response = await apiPost<AuthenticationResponseDTO>(
    '/auth/login',
    credentials
  );

  if (!response.success || !response.data) {
    return handleApiError(response, true);
  }

  await setAuthCookies(response.data);

  const isSafePath =
    typeof redirectTo === 'string' &&
    redirectTo.startsWith('/') &&
    !redirectTo.startsWith('//');
  redirect(isSafePath ? redirectTo : '/dashboard');
}

export async function registerAction(
  data: RegisterRequestDTO
): Promise<ActionResult> {
  const response = await apiPost<AuthenticationResponseDTO>(
    '/auth/register',
    data
  );

  if (!response.success || !response.data) {
    return handleApiError(response, false);
  }

  await setAuthCookies(response.data);
  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  const refreshToken = await getRefreshToken();

  if (refreshToken) {
    await apiPost<void>('/auth/logout', { refreshToken })
      .catch(() => {});
  }

  await clearAuthCookies();
  redirect('/login');
}
