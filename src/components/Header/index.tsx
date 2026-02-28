'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserMenu from '@/components/UserMenu';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const t = useTranslations('userMenu');

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link href={isAuthenticated ? '/dashboard' : '/'} className='text-2xl font-bold'>
          Booker
        </Link>

        <div className='flex items-center gap-2'>
          <LanguageSwitcher />
          <ThemeToggle />

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button variant='ghost' asChild>
              <Link href='/login'>{t('login')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
