import {
  type ApiResponse,
  type ApiError,
  ApiErrorCode,
  type Page,
} from '@/lib/types/api.types';
import type { Dispatch, SetStateAction } from 'react';

const API_BASE_URL = process.env.API_URL || 'http://localhost:8080';

const HTTP_STATUS_TO_ERROR_CODE: Record<number, ApiErrorCode> = {
  400: ApiErrorCode.VALIDATION_ERROR,
  401: ApiErrorCode.INVALID_CREDENTIALS,
  403: ApiErrorCode.ACCESS_DENIED,
  404: ApiErrorCode.RESOURCE_NOT_FOUND
};

function resolveErrorCode(status: number, responseCode?: string): string {
  if (responseCode) return responseCode;
  if (HTTP_STATUS_TO_ERROR_CODE[status]) return HTTP_STATUS_TO_ERROR_CODE[status];
  if (status >= 500) return ApiErrorCode.SERVER_ERROR;
  return ApiErrorCode.DEFAULT;
}

function extractFieldErrors(
  meta?: Record<string, unknown>
): Record<string, string> | undefined {
  const fieldErrors = meta?.fieldErrors;
  if (!fieldErrors || typeof fieldErrors !== 'object') return undefined;
  return fieldErrors as Record<string, string>;
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);

      return {
        data,
        success: true
      };
    }

    const errorData = await response.json().catch(() => ({ message: response.statusText }));

    const meta = errorData.meta as Record<string, unknown> | undefined;

    const error: ApiError = {
      status: response.status,
      code: resolveErrorCode(response.status, errorData.code),
      message: errorData.message || errorData.error || response.statusText,
      timestamp: errorData.timestamp,
      meta,
      fieldErrors: extractFieldErrors(meta)
    };

    return {
      error,
      success: false
    };
  } catch (error) {
    const apiError: ApiError = {
      code: ApiErrorCode.NETWORK_ERROR,
      message: error instanceof Error ? error.message : 'Network request failed'
    };

    return {
      error: apiError,
      success: false
    };
  }
}

async function apiGet<T>(endpoint: string, options?: RequestInit) {
  return apiFetch<T>(endpoint, { ...options, method: 'GET' });
}

async function apiPost<T>(
  endpoint: string,
  body?: unknown,
  options?: RequestInit
) {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined
  });
}

async function apiPatch<T>(
  endpoint: string,
  body?: unknown,
  options?: RequestInit
) {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined
  });
}

async function apiDelete<T>(
  endpoint: string,
  options?: RequestInit
) {
  return apiFetch<T>(endpoint, { ...options, method: 'DELETE' });
}

async function loadData<T>(endpoint: string, setState: Dispatch<SetStateAction<T[]>>) {
  const response = await apiGet<Page<T>>(endpoint);

  if (response.data) setState(response.data.content);
}

export {
  apiFetch,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
  loadData,
};