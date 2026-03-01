'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Pencil, Trash2, Plus, ShieldCheck, Ban } from 'lucide-react';
import type { PageUserDTO, UserListItemDTO } from '@/lib/types/user.types';
import CreateUserDialog from '../CreateUserDialog';
import EditUserDialog from '../EditUserDialog';
import DeleteUserDialog from '../DeleteUserDialog';

interface UsersTableProps {
  initialData: PageUserDTO | null;
  initialPage: number;
}

export default function UsersTable({ initialData, initialPage }: UsersTableProps) {
  const t = useTranslations('adminUsers');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserListItemDTO | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserListItemDTO | null>(null);

  const users = initialData?.content ?? [];
  const totalPages = initialData?.totalPages ?? 0;
  const currentPage = initialData?.number ?? initialPage;

  function navigatePage(page: number) {
    router.push(`${pathname}?page=${page}`);
  }

  return (
    <TooltipProvider>
      <div className='space-y-4'>
        <div className='flex justify-end'>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className='mr-2 w-4 h-4' />
            {t('actions.create')}
          </Button>
        </div>

        <div className='border rounded-lg'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.username')}</TableHead>
                <TableHead>{t('table.name')}</TableHead>
                <TableHead>{t('table.email')}</TableHead>
                <TableHead className='hidden md:table-cell'>{t('table.bio')}</TableHead>
                <TableHead className='hidden lg:table-cell'>{t('table.createdAt')}</TableHead>
                <TableHead className='text-right'>{t('table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='py-12 text-muted-foreground text-center'
                  >
                    {t('empty')}
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className='flex items-center gap-1.5'>
                        <Badge variant='secondary'>@{user.username}</Badge>
                        {user.role === 'ADMIN' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <ShieldCheck className='w-3.5 h-3.5 text-primary cursor-default' />
                            </TooltipTrigger>
                            <TooltipContent>
                              {t(`fields.roles.${user.role}`)}
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {!user.accountNonLocked && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Ban className='w-3.5 h-3.5 text-destructive cursor-default' />
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('table.banned')}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className='font-medium'>{user.name}</TableCell>
                    <TableCell className='text-sm'>{user.email}</TableCell>
                    <TableCell className='hidden md:table-cell max-w-[180px] text-muted-foreground text-sm truncate'>
                      {user.bio ?? '—'}
                    </TableCell>
                    <TableCell className='hidden lg:table-cell text-muted-foreground text-sm'>
                      {new Date(user.createdAt).toLocaleDateString(locale)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => setEditUser(user)}
                          aria-label={t('actions.edit')}
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => setDeleteUser(user)}
                          aria-label={t('actions.delete')}
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className='flex justify-between items-center'>
            <p className='text-muted-foreground text-sm'>
              {t('pagination.pageInfo', {
                current: currentPage + 1,
                total: totalPages,
              })}
            </p>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                disabled={currentPage === 0}
                onClick={() => navigatePage(currentPage - 1)}
              >
                {t('pagination.previous')}
              </Button>
              <Button
                variant='outline'
                size='sm'
                disabled={currentPage >= totalPages - 1}
                onClick={() => navigatePage(currentPage + 1)}
              >
                {t('pagination.next')}
              </Button>
            </div>
          </div>
        )}

        <CreateUserDialog
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
        <EditUserDialog
          user={editUser}
          open={editUser !== null}
          onClose={() => setEditUser(null)}
        />
        <DeleteUserDialog
          user={deleteUser}
          open={deleteUser !== null}
          onClose={() => setDeleteUser(null)}
        />
      </div>
    </TooltipProvider>
  );
}
