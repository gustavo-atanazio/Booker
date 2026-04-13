export enum ApiErrorCode {
  // Network/Infrastructure
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',

  // Authentication
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  // Authorization
  ACCESS_DENIED = 'ACCESS_DENIED',

  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TYPE_MISMATCH = 'TYPE_MISMATCH',

  // Resource
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

  // Security-sensitive (should be remapped in public contexts)
  USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',

  // Generic fallback
  DEFAULT = 'DEFAULT',
}

// Codes that reveal too much info in public (unauthenticated) contexts
export const SECURITY_SENSITIVE_CODES: readonly ApiErrorCode[] = [
  ApiErrorCode.USERNAME_ALREADY_EXISTS,
  ApiErrorCode.EMAIL_ALREADY_EXISTS,
  ApiErrorCode.INCORRECT_PASSWORD,
];

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

export interface ApiError {
  code?: string;
  status?: number;
  message?: string;
  timestamp?: string;
  meta?: Record<string, unknown>;
  fieldErrors?: Record<string, string>;
}
