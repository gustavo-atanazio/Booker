import { apiFetch } from './api';
import {
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from '@/lib/auth/cookies';
import { refreshAccessToken } from '@/lib/auth/token-refresh';
import { ApiResponse } from '@/lib/types/api.types';

// 1. If access_token is missing, tries refresh before giving up
// 2. If API returns 401, tries refresh and retries once
// 3. Clears cookies if refresh fails
export async function authenticatedFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    accessToken = await tryRefreshOrFail();
    if (!accessToken) {
      return sessionExpiredResponse();
    }
  }

  let response = await makeAuthenticatedRequest<T>(
    endpoint,
    accessToken,
    options
  );

  if (!response.success && response.error?.status === 401) {
    accessToken = await tryRefreshOrFail();
    if (!accessToken) {
      return sessionExpiredResponse();
    }
    response = await makeAuthenticatedRequest<T>(
      endpoint,
      accessToken,
      options
    );
  }

  return response;
}

async function tryRefreshOrFail(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    await clearAuthCookies();
    return null;
  }

  const result = await refreshAccessToken(refreshToken);
  if (result.success && result.data) {
    await setAuthCookies(result.data);
    return result.data.accessToken;
  }

  await clearAuthCookies();
  return null;
}

function sessionExpiredResponse(): ApiResponse<never> {
  return {
    error: {
      code: 'SESSION_EXPIRED',
      message: 'Session expired, please login again',
      status: 401,
    },
    success: false,
  };
}

async function makeAuthenticatedRequest<T>(
  endpoint: string,
  accessToken: string,
  options: RequestInit
): Promise<ApiResponse<T>> {
  return apiFetch<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
