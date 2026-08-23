'use server';

import { apiGet } from '@/services/api';
import type { BookSummary, default as Book } from '@/types/Book';
import type { Page } from '@/lib/types/api.types';
import type { ReviewSummary } from '@/types/Review';
import { PUBLIC_ENDPOINT, BOOKS_ENPOINT } from '@/constants/api';

export async function getBooksAction(): Promise<BookSummary[]> {
  const response = await apiGet<Page<BookSummary>>(PUBLIC_ENDPOINT + BOOKS_ENPOINT);
  return response.data?.content ?? [];
}

export async function getBookByIdAction(id: string): Promise<Book | null> {
  const response = await apiGet<Book>(`${PUBLIC_ENDPOINT + BOOKS_ENPOINT}/${id}`);
  return response.data ?? null;
}

export async function getBookReviewsAction(id: string): Promise<ReviewSummary[]> {
  const response = await apiGet<Page<ReviewSummary>>(
    `${PUBLIC_ENDPOINT + BOOKS_ENPOINT}/${id}/reviews`
  );
  return response.data?.content ?? [];
}

