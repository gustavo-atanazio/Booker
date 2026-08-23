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
          <CircleUser className='w-5 h-5' />
          <span className='sr-only'>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='font-medium text-sm leading-none'>{user.name}</p>
            <p className='text-muted-foreground text-xs leading-none'>{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href='/profile'>
            <CircleUser className='mr-2 w-4 h-4' />
            {t('profile')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href='/settings'>
            <Settings className='mr-2 w-4 h-4' />
            {t('settings')}
          </Link>
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/admin'>
              <Shield className='mr-2 w-4 h-4' />
              {t('admin')}
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='cursor-pointer'>
          <form action={logoutAction} className='w-full'>
            <button type='submit' className='flex items-center w-full'>
              <LogOut className='mr-2 w-4 h-4' />
              {t('logout')}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
