'use server';

import { apiPost } from '@/services/api';
import {
  setAuthCookies,
  clearAuthCookies,
  getRefreshToken,
} from '@/lib/auth/cookies';
import { loginSchema, registerSchema } from '@/lib/validation/auth.schema';
import type {
  LoginRequestDTO,
  RegisterRequestDTO,
  AuthenticationResponseDTO,
} from '@/lib/types/auth.types';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';
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

function extractTranslationMeta(
  meta?: Record<string, unknown>
): Record<string, string | number> | undefined {
  if (!meta) return undefined;
  const result: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (typeof value === 'string' || typeof value === 'number') {
      result[key] = value;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

function maskSecuritySensitiveCode(code: string): string {
  if (SECURITY_SENSITIVE_CODES.includes(code as ApiErrorCode)) {
    return ApiErrorCode.VALIDATION_ERROR;
  }
  return code;
}

function handleValidationError(error: ZodError): ActionResult {
  return {
    error: {
      code: ApiErrorCode.VALIDATION_ERROR,
      message: 'Please check your input',
      fieldErrors: z.flattenError(error).fieldErrors as Record<string, string[]>,
    },
    success: false,
  };
}

function handleApiError(
  response: ApiResponse<unknown>,
  defaultCode: string,
  defaultMessage: string,
  maskSensitive: boolean = false
): ActionResult {
  const originalCode = response.error?.code || defaultCode;
  const code = maskSensitive ? maskSecuritySensitiveCode(originalCode) : originalCode;

  return {
    error: {
      code,
      message: response.error?.message || defaultMessage,
      fieldErrors: transformFieldErrors(response.error?.fieldErrors),
      meta: extractTranslationMeta(response.error?.meta),
    },
    success: false,
  };
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const rawData = {
    usernameOrEmail: formData.get('usernameOrEmail'),
    password: formData.get('password'),
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    return handleValidationError(validation.error);
  }

  const credentials: LoginRequestDTO = validation.data;
  const response = await apiPost<AuthenticationResponseDTO>(
    '/auth/login',
    credentials
  );

  if (!response.success || !response.data) {
    return handleApiError(response, ApiErrorCode.INVALID_CREDENTIALS, 'Login failed', true);
  }

  await setAuthCookies(response.data);
  redirect('/dashboard');
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  const rawData = {
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const validation = registerSchema.safeParse(rawData);
  if (!validation.success) {
    return handleValidationError(validation.error);
  }

  const response = await apiPost<AuthenticationResponseDTO>(
    '/auth/register',
    validation.data as RegisterRequestDTO
  );

  if (!response.success || !response.data) {
    return handleApiError(response, 'REGISTER_FAILED', 'Registration failed', true);
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
