'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Home, Search, User } from 'lucide-react';

function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const items = [
    { label: t('home'), to: '/', icon: Home },
    { label: t('explore'), to: '/search', icon: Search },
    { label: t('profile'), to: '/profile', icon: User }
  ];

  return (
    <nav className='md:hidden bottom-0 z-50 fixed inset-x-0 bg-black border-white/10 border-t'>
      <div className='flex items-center'>
        {items.map(({ label, to, icon: Icon }) => {
          const active = pathname === to;

          return (
            <Link
              key={to}
              href={to}
              className='flex flex-col flex-1 justify-center items-center gap-1 py-3'
            >
              <Icon className={`w-5 h-5 transition-colors ${active ? 'text-yellow-400' : 'text-gray-500'}`} />

              <span className={`text-xs transition-colors ${active ? 'text-yellow-400' : 'text-gray-500'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;