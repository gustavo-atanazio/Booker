import { apiPost } from '@/services/api';
import { AuthenticationResponseDTO } from '@/lib/types/auth.types';
import { ApiResponse } from '@/lib/types/api.types';

let refreshPromise: Promise<ApiResponse<AuthenticationResponseDTO>> | null =
  null;

// Deduplicates concurrent refresh requests within the same process.
export async function refreshAccessToken(
  refreshToken: string
): Promise<ApiResponse<AuthenticationResponseDTO>> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = apiPost<AuthenticationResponseDTO>(
    '/auth/refresh',
    { refreshToken }
  );

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}
