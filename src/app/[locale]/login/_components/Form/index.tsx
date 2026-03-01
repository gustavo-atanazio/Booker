'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginSchema, type LoginFormData } from '@/lib/validation/auth.schema';
import { loginAction } from '@/actions/auth.actions';
import { useActionSubmit } from '@/hooks/useActionSubmit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

interface FormProps {
  redirectTo?: string;
}

export default function Form({ redirectTo }: FormProps) {
  const t = useTranslations('login');
  const tV = useTranslations('validation');
  const { serverError, isSubmitting, submitAction } = useActionSubmit();

  const schema = useMemo(() => createLoginSchema(tV), [tV]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginFormData) =>
    submitAction(
      () => loginAction(data, redirectTo),
      (fieldErrors) => {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (field in schema.shape) {
            setError(field as keyof LoginFormData, { message: messages[0] });
          }
        }
      }
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div className='bg-destructive/10 mb-4 p-3 rounded text-destructive text-sm'>
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
          <p className='text-destructive text-sm'>
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
          <p className='text-destructive text-sm'>{errors.password.message}</p>
        )}
      </div>

      <Button className='mt-6 w-full' type='submit' disabled={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
