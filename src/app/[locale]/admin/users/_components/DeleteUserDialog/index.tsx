'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { deleteUserAction } from '@/actions/user.actions';
import { useActionSubmit } from '@/hooks/useActionSubmit';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { UserListItemDTO } from '@/lib/types/user.types';

interface DeleteUserDialogProps {
  user: UserListItemDTO | null;
  open: boolean;
  onClose: () => void;
}

export default function DeleteUserDialog({
  user,
  open,
  onClose,
}: DeleteUserDialogProps) {
  const t = useTranslations('adminUsers');
  const router = useRouter();
  const { serverError, isSubmitting, submitAction } = useActionSubmit();

  function handleConfirm() {
    if (!user) return;
    submitAction(async () => {
      const result = await deleteUserAction(user.id);
      if (result.success) {
        onClose();
        router.refresh();
      }
      return result;
    });
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('deleteDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('deleteDialog.description', { name: user?.name ?? '' })}
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <p className='text-sm text-destructive'>{serverError}</p>
        )}

        <DialogFooter className='gap-2'>
          <Button
            variant='outline'
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t('deleteDialog.cancel')}
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? '...' : t('deleteDialog.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
