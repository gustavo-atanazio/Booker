'use server';

import { apiPost, apiPatch, apiDelete } from '@/services/api';
import { getAccessToken } from '@/lib/auth/cookies';
import { revalidatePath } from 'next/cache';
import type { ActionResult } from '@/actions/auth.actions';
import type { ApiResponse } from '@/lib/types/api.types';
import { ApiErrorCode } from '@/lib/types/api.types';
import type { CreateReviewDTO, UpdateReviewDTO, ReviewSummary } from '@/types/Review';

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
    error: {
      code,
      message: response.error?.message,
      fieldErrors,
      meta: response.error?.meta as Record<string, string | number> | undefined,
    },
  };
}

export async function createReviewAction(
  data: CreateReviewDTO
): Promise<ActionResult & { review?: ReviewSummary }> {
  const headers = await getAuthHeaders();
  if (!headers.Authorization) {
    return {
      success: false,
      error: {
        code: ApiErrorCode.ACCESS_DENIED,
        message: 'Você precisa estar autenticado para enviar uma avaliação.',
      },
    };
  }

  const payload = {
    bookID: data.bookID,
    score: data.score,
    headline: data.headline?.trim() ? data.headline.trim() : null,
    text: data.text,
  };

  const response = await apiPost<ReviewSummary>('/reviews', payload, { headers });
  if (!response.success) {
    return handleApiError(response);
  }

  if (data.bookID) {
    revalidatePath(`/book/${data.bookID}`);
  }
  revalidatePath('/profile');

  return {
    success: true,
    review: response.data,
  };
}

export async function updateReviewAction(
  id: string,
  data: UpdateReviewDTO,
  bookId?: string
): Promise<ActionResult> {
  const headers = await getAuthHeaders();
  if (!headers.Authorization) {
    return {
      success: false,
      error: {
        code: ApiErrorCode.ACCESS_DENIED,
        message: 'Você precisa estar autenticado para editar uma avaliação.',
      },
    };
  }

  const payload = {
    ...(data.score !== undefined ? { score: data.score } : {}),
    ...(data.headline !== undefined ? { headline: data.headline?.trim() ? data.headline.trim() : null } : {}),
    ...(data.text !== undefined ? { text: data.text } : {}),
  };

  const response = await apiPatch(`/reviews/${id}`, payload, { headers });
  if (!response.success) {
    return handleApiError(response);
  }

  if (bookId) {
    revalidatePath(`/book/${bookId}`);
  }
  revalidatePath('/profile');

  return { success: true };
}

export async function deleteReviewAction(
  id: string,
  bookId?: string
): Promise<ActionResult> {
  const headers = await getAuthHeaders();
  if (!headers.Authorization) {
    return {
      success: false,
      error: {
        code: ApiErrorCode.ACCESS_DENIED,
        message: 'Você precisa estar autenticado para excluir uma avaliação.',
      },
    };
  }

  const response = await apiDelete(`/reviews/${id}`, { headers });
  if (!response.success) {
    return handleApiError(response);
  }

  if (bookId) {
    revalidatePath(`/book/${bookId}`);
  }
  revalidatePath('/profile');

  return { success: true };
}

