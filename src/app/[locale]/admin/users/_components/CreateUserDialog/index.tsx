'use client';

import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import {
  createCreateUserSchema,
  type CreateUserFormData,
} from '@/lib/validation/user.schema';
import { createUserAction } from '@/actions/user.actions';
import { useActionSubmit } from '@/hooks/useActionSubmit';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateUserDialog({
  open,
  onClose,
}: CreateUserDialogProps) {
  const t = useTranslations('adminUsers');
  const tV = useTranslations('validation');
  const router = useRouter();
  const { serverError, isSubmitting, submitAction } = useActionSubmit();

  const schema = useMemo(() => createCreateUserSchema(tV), [tV]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'USER',
      enabled: true,
      accountNonLocked: true,
    },
  });

  function handleClose() {
    reset();
    onClose();
  }

  const onSubmit = (data: CreateUserFormData) =>
    submitAction(
      async () => {
        const result = await createUserAction(data);
        if (result.success) {
          handleClose();
          router.refresh();
        }
        return result;
      },
      (fieldErrors) => {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          setError(field as keyof CreateUserFormData, { message: messages[0] });
        }
      }
    );

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className='max-w-lg max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{t('createDialog.title')}</DialogTitle>
          <DialogDescription>{t('createDialog.description')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {serverError && (
            <div className='bg-destructive/10 p-3 rounded-md text-destructive text-sm'>
              {serverError}
            </div>
          )}

          <div className='space-y-1.5'>
            <Label htmlFor='create-name'>{t('fields.name')}</Label>
            <Input
              id='create-name'
              placeholder={t('fields.namePlaceholder')}
              {...register('name')}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className='text-destructive text-sm'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='create-username'>{t('fields.username')}</Label>
            <Input
              id='create-username'
              placeholder={t('fields.usernamePlaceholder')}
              {...register('username')}
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className='text-destructive text-sm'>{errors.username.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='create-email'>{t('fields.email')}</Label>
            <Input
              id='create-email'
              type='email'
              placeholder={t('fields.emailPlaceholder')}
              {...register('email')}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className='text-destructive text-sm'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='create-password'>{t('fields.password')}</Label>
            <Input
              id='create-password'
              type='password'
              placeholder='••••••••'
              {...register('password')}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className='text-destructive text-sm'>{errors.password.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='create-bio'>{t('fields.bio')}</Label>
            <Textarea
              id='create-bio'
              placeholder={t('fields.bioPlaceholder')}
              {...register('bio')}
              disabled={isSubmitting}
              rows={3}
            />
            {errors.bio && (
              <p className='text-destructive text-sm'>{errors.bio.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label>{t('fields.role')}</Label>
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='USER'>{t('fields.roles.USER')}</SelectItem>
                    <SelectItem value='ADMIN'>{t('fields.roles.ADMIN')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className='flex items-center gap-2'>
            <Controller
              name='enabled'
              control={control}
              render={({ field }) => (
                <Checkbox
                  id='create-enabled'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            <Label htmlFor='create-enabled'>{t('fields.enabled')}</Label>
          </div>

          <div className='flex items-center gap-2'>
            <Controller
              name='accountNonLocked'
              control={control}
              render={({ field }) => (
                <Checkbox
                  id='create-accountNonLocked'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            <Label htmlFor='create-accountNonLocked'>
              {t('fields.accountNonLocked')}
            </Label>
          </div>

          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {t('deleteDialog.cancel')}
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting
                ? t('createDialog.submitting')
                : t('createDialog.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
