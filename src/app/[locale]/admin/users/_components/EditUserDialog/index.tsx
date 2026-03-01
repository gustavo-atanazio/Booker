'use client';

import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import {
  createUpdateUserSchema,
  type UpdateUserFormData,
} from '@/lib/validation/user.schema';
import { updateUserAction } from '@/actions/user.actions';
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
import type { UserListItemDTO } from '@/lib/types/user.types';

interface EditUserDialogProps {
  user: UserListItemDTO | null;
  open: boolean;
  onClose: () => void;
}

export default function EditUserDialog({
  user,
  open,
  onClose,
}: EditUserDialogProps) {
  const t = useTranslations('adminUsers');
  const tV = useTranslations('validation');
  const router = useRouter();
  const { serverError, isSubmitting, submitAction } = useActionSubmit();

  const schema = useMemo(() => createUpdateUserSchema(tV), [tV]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'USER',
      accountNonLocked: true,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio ?? '',
        role: user.role,
        accountNonLocked: user.accountNonLocked,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UpdateUserFormData) => {
    if (!user) return;
    submitAction(
      async () => {
        const result = await updateUserAction(user.id, data);
        if (result.success) {
          onClose();
          router.refresh();
        }
        return result;
      },
      (fieldErrors) => {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          setError(field as keyof UpdateUserFormData, { message: messages[0] });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className='max-w-lg max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{t('editDialog.title')}</DialogTitle>
          <DialogDescription>{t('editDialog.description')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {serverError && (
            <div className='bg-destructive/10 p-3 rounded-md text-destructive text-sm'>
              {serverError}
            </div>
          )}

          <div className='space-y-1.5'>
            <Label htmlFor='edit-name'>{t('fields.name')}</Label>
            <Input
              id='edit-name'
              {...register('name')}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className='text-destructive text-sm'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='edit-username'>{t('fields.username')}</Label>
            <Input
              id='edit-username'
              {...register('username')}
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className='text-destructive text-sm'>{errors.username.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='edit-email'>{t('fields.email')}</Label>
            <Input
              id='edit-email'
              type='email'
              {...register('email')}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className='text-destructive text-sm'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='edit-bio'>{t('fields.bio')}</Label>
            <Textarea
              id='edit-bio'
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
              name='accountNonLocked'
              control={control}
              render={({ field }) => (
                <Checkbox
                  id='edit-accountNonLocked'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            <Label htmlFor='edit-accountNonLocked'>
              {t('fields.accountNonLocked')}
            </Label>
          </div>

          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isSubmitting}
            >
              {t('deleteDialog.cancel')}
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting
                ? t('editDialog.submitting')
                : t('editDialog.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
