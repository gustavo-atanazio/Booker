interface ApiError {
  code?: string;
  status?: number;
  message?: string;
  timestamp?: string;
  meta?: Record<string, string | number>;
}

type TranslateFunction = (key: string, values?: Record<string, string | number>) => string;

/**
 * Translates API errors to localized messages
 * @example
 * const t = useTranslations('errors');
 * const errorMsg = translateError(apiError, t);
 */
export function translateError(error: ApiError | null | undefined, t: TranslateFunction): string {
  if (!error) return t('DEFAULT');

  const code = error.code ?? 'DEFAULT';

  const translated = t(code, error.meta);

  return translated;
}
