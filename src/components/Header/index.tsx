'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';

import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Explorar', to: '/search' },
  { label: 'Perfil', to: '/profile' }
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className='top-0 z-50 sticky bg-black border-white/10 border-b'>
      <div className='flex justify-between items-center mx-auto px-4 max-w-7xl h-14'>
        <Link href='/' onClick={() => setMenuOpen(false)}>
          <Logo size='sm'/>
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
          >
            <Search className='w-5 h-5'/>
          </button>

          <Link
            href='/login'
            className='bg-yellow-400 hover:bg-yellow-300 px-4 py-1.5 rounded-full font-semibold text-black text-sm transition-colors'
          >
            Entrar
          </Link>
        </div>

        <div className='md:hidden flex items-center gap-3'>
          <button
            onClick={() => router.push('/search')}
            className='text-gray-400 hover:text-white transition-colors'
          >
            <Search className='w-5 h-5'/>
          </button>

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className='text-gray-400 hover:text-white transition-colors'
          >
            {menuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5'/>}
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

          <Link
            href='/login'
            onClick={() => setMenuOpen(false)}
            className='bg-yellow-400 hover:bg-yellow-300 mt-2 px-4 py-2 rounded-full font-semibold text-black text-sm text-center transition-colors'
          >
            Entrar
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;