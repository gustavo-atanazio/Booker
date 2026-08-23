'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search, Menu, X } from 'lucide-react';

import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/providers/AuthProvider';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('nav');
  const { user } = useAuth();

  const navLinks = [
    { label: t('home'), to: '/' },
    { label: t('explore'), to: '/search' },
    { label: t('profile'), to: '/profile' }
  ];

  return (
    <header className='top-0 z-50 sticky bg-black border-white/10 border-b'>
      <div className='flex justify-between items-center mx-auto px-4 max-w-7xl h-14'>
        <Link href='/' onClick={() => setMenuOpen(false)}>
          <Logo size='sm' />
        </Link>

        <nav className='hidden md:flex items-center gap-6'>
          {navLinks.map(link => (
            <Link
              key={link.to}
              href={link.to}
              className='font-medium text-gray-400 hover:text-white text-sm transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='hidden md:flex items-center gap-3'>
          <button
            onClick={() => router.push('/search')}
            className='text-gray-400 hover:text-white transition-colors'
            aria-label={t('search')}
          >
            <Search className='w-5 h-5' />
          </button>

          <LanguageSwitcher />
          <ThemeToggle />

          {user ? (
            <UserMenu />
          ) : (
            <Link
              href='/login'
              className='bg-yellow-400 hover:bg-yellow-300 px-4 py-1.5 rounded-full font-semibold text-black text-sm transition-colors'
            >
              {t('login')}
            </Link>
          )}
        </div>

        <div className='md:hidden flex items-center gap-2'>
          <button
            onClick={() => router.push('/search')}
            className='p-1 text-gray-400 hover:text-white transition-colors'
            aria-label={t('search')}
          >
            <Search className='w-5 h-5' />
          </button>

          <LanguageSwitcher />

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className='p-1 text-gray-400 hover:text-white transition-colors'
            aria-label={t('toggleMenu')}
          >
            {menuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className='md:hidden flex flex-col gap-4 bg-black px-4 py-4 border-white/10 border-t'>
          {navLinks.map(link => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setMenuOpen(false)}
              className='font-medium text-gray-300 hover:text-white text-base transition-colors'
            >
              {link.label}
            </Link>
          ))}

          <div className='flex justify-between items-center pt-2 border-white/10 border-t'>
            <span className='text-gray-400 text-sm'>Tema</span>
            <ThemeToggle />
          </div>

          {user ? (
            <div className='pt-2'>
              <UserMenu />
            </div>
          ) : (
            <Link
              href='/login'
              onClick={() => setMenuOpen(false)}
              className='bg-yellow-400 hover:bg-yellow-300 mt-2 px-4 py-2 rounded-full font-semibold text-black text-sm text-center transition-colors'
            >
              {t('login')}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;