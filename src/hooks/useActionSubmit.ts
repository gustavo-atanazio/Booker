'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ActionResult } from '@/actions/auth.actions';

export function useActionSubmit() {
  const tErrors = useTranslations('errors');
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitAction(
    action: () => Promise<ActionResult>,
    onFieldErrors?: (fieldErrors: Record<string, string[]>) => void
  ) {
    setIsSubmitting(true);
    setServerError('');

    try {
      const result = await action();

      if (!result) return;

      if (!result.success && result.error) {
        if (result.error.fieldErrors && onFieldErrors) {
          onFieldErrors(result.error.fieldErrors);
        }

        const code = result.error.code ?? 'DEFAULT';
        setServerError(
          tErrors.has(code) ? tErrors(code, result.error.meta) : tErrors('DEFAULT')
        );
      }
    } catch (error: unknown) {
      const digest = (error as { digest?: string })?.digest;
      if (typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT')) {
        throw error;
      }
      setServerError(tErrors('DEFAULT'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return { serverError, isSubmitting, submitAction };
}
