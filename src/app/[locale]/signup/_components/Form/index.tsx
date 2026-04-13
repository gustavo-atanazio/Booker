'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRegisterSchema, type RegisterFormData } from '@/lib/validation/auth.schema';
import { registerAction } from '@/actions/auth.actions';
import { useActionSubmit } from '@/hooks/useActionSubmit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

export default function Form() {
  const t = useTranslations('signup');
  const tV = useTranslations('validation');
  const { serverError, isSubmitting, submitAction } = useActionSubmit();

  const schema = useMemo(() => createRegisterSchema(tV), [tV]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) =>
    submitAction(
      () => registerAction(data),
      (fieldErrors) => {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (field in schema.shape) {
            setError(field as keyof RegisterFormData, { message: messages[0] });
          }
        }
      }
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {serverError && (
        <div className='bg-destructive/10 p-3 rounded text-destructive text-sm'>
          {serverError}
        </div>
      )}

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='name'>{t('name')}</Label>
        <Input
          id='name'
          placeholder={t('namePlaceholder')}
          type='text'
          {...register('name')}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className='text-destructive text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='username'>{t('username')}</Label>
        <Input
          id='username'
          placeholder={t('usernamePlaceholder')}
          type='text'
          {...register('username')}
          disabled={isSubmitting}
        />
        {errors.username && (
          <p className='text-destructive text-sm'>{errors.username.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='email'>{t('email')}</Label>
        <Input
          id='email'
          placeholder={t('emailPlaceholder')}
          type='email'
          {...register('email')}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className='text-destructive text-sm'>{errors.email.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='password'>{t('password')}</Label>
        <Input
          id='password'
          placeholder={t('passwordPlaceholder')}
          type='password'
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className='text-destructive text-sm'>{errors.password.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='confirmPassword'>{t('confirmPassword')}</Label>
        <Input
          id='confirmPassword'
          placeholder={t('confirmPasswordPlaceholder')}
          type='password'
          {...register('confirmPassword')}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className='text-destructive text-sm'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button className='mt-6 w-full' type='submit' disabled={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
