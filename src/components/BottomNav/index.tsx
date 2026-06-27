'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User } from 'lucide-react';

const items = [
  { label: 'Início', to: '/', icon: Home },
  { label: 'Explorar', to: '/search', icon: Search },
  { label: 'Perfil', to: '/profile', icon: User }
];

function BottomNav() {
  const pathname = usePathname();

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
              <Icon className={`w-5 h-5 transition-colors ${active ? 'text-yellow-400' : 'text-gray-500'}`}/>

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