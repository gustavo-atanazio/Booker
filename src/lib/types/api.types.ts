enum ApiErrorCode {
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
  DEFAULT = 'DEFAULT'
}

// Codes that reveal too much info in public (unauthenticated) contexts
const SECURITY_SENSITIVE_CODES: readonly ApiErrorCode[] = [
  ApiErrorCode.USERNAME_ALREADY_EXISTS,
  ApiErrorCode.EMAIL_ALREADY_EXISTS,
  ApiErrorCode.INCORRECT_PASSWORD
];

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

interface ApiError {
  code?: string;
  status?: number;
  message?: string;
  timestamp?: string;
  meta?: Record<string, unknown>;
  fieldErrors?: Record<string, string>;
}

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type {
  ApiResponse,
  ApiError,
  Page,
  Pageable,
  Sort
};

export {
  ApiErrorCode,
  SECURITY_SENSITIVE_CODES
};