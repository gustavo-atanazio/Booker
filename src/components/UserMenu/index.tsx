'use client';

import { CircleUser, LayoutDashboard, Settings, Shield, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers/AuthProvider';
import { logoutAction } from '@/actions/auth.actions';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function UserMenu() {
  const { user, isAdmin } = useAuth();
  const t = useTranslations('userMenu');

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <CircleUser className='h-5 w-5' />
          <span className='sr-only'>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href='/dashboard'>
            <LayoutDashboard className='mr-2 h-4 w-4' />
            {t('dashboard')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href='/settings'>
            <Settings className='mr-2 h-4 w-4' />
            {t('settings')}
          </Link>
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/admin'>
              <Shield className='mr-2 h-4 w-4' />
              {t('admin')}
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='cursor-pointer'>
          <form action={logoutAction} className='w-full'>
            <button type='submit' className='flex w-full items-center'>
              <LogOut className='mr-2 h-4 w-4' />
              {t('logout')}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
