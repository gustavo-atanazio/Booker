'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validation/auth.schema';
import { loginAction } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Form() {
  const t = useTranslations('login');
  const tErrors = useTranslations('errors');
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      const formData = new FormData();
      formData.append('usernameOrEmail', data.usernameOrEmail);
      formData.append('password', data.password);

      const result = await loginAction(formData);

      if (!result.success && result.error) {
        if (result.error.fieldErrors) {
          for (const [field, messages] of Object.entries(result.error.fieldErrors)) {
            if (field in loginSchema.shape) {
              setError(field as keyof LoginFormData, { message: messages[0] });
            }
          }
        }

        const code = result.error.code ?? 'DEFAULT';
        const errorMsg =
          tErrors.has(code) ? tErrors(code, result.error.meta) : tErrors('DEFAULT');
        setServerError(errorMsg);
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div className='mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm'>
          {serverError}
        </div>
      )}

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='usernameOrEmail'>{t('usernameOrEmail')}</Label>
        <Input
          id='usernameOrEmail'
          placeholder={t('usernameOrEmailPlaceholder')}
          type='text'
          {...register('usernameOrEmail')}
          disabled={isSubmitting}
        />
        {errors.usernameOrEmail && (
          <p className='text-sm text-destructive'>
            {errors.usernameOrEmail.message}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-1.5 mt-4'>
        <Label htmlFor='password'>{t('password')}</Label>
        <Input
          id='password'
          placeholder='********'
          type='password'
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className='text-sm text-destructive'>{errors.password.message}</p>
        )}
      </div>

      <Button className='mt-6 w-full' type='submit' disabled={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
