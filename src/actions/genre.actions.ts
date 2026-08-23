'use server';

import { apiGet } from '@/services/api';
import type Genre from '@/types/Genre';
import type { Page } from '@/lib/types/api.types';
import { PUBLIC_ENDPOINT, GENRES_ENDPOINT } from '@/constants/api';

export async function getGenresAction(): Promise<Genre[]> {
  const response = await apiGet<Page<Genre>>(PUBLIC_ENDPOINT + GENRES_ENDPOINT);
  return response.data?.content ?? [];
}

