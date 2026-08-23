'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

import Logo from '@/components/Logo';

type Mode = 'login' | 'register';

function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/profile');
  };

  return (
    <div className='flex flex-col justify-center items-center bg-black px-4 py-12 pb-28 md:pb-12 min-h-screen'>
      <Link href='/' className='mb-8'>
        <Logo size='lg'/>
      </Link>

      <div className='bg-white shadow-2xl p-8 rounded-3xl w-full max-w-sm'>
        <div className='flex bg-gray-100 mb-6 p-1 rounded-full'>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              mode === 'login' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Entrar
          </button>

          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              mode === 'register' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {mode === 'register' && (
            <div>
              <label className='block mb-1.5 font-medium text-gray-700 text-sm'>Nome</label>

              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Seu nome completo'
                required
                className='bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
              />
            </div>
          )}

          <div>
            <label className='block mb-1.5 font-medium text-gray-700 text-sm'>Email</label>

            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='seu@email.com'
              required
              className='bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
            />
          </div>

          <div>
            <label className='block mb-1.5 font-medium text-gray-700 text-sm'>Senha</label>

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='••••••••'
                required
                className='bg-white px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
              />

              <button
                type='button'
                onClick={() => setShowPassword(p => !p)}
                className='top-1/2 right-3.5 absolute text-gray-400 hover:text-gray-600 transition-colors -translate-y-1/2'
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className='flex justify-between items-center'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className='border-gray-300 rounded w-4 h-4 accent-yellow-400'
                />

                <span className='text-gray-600 text-sm'>Lembrar de mim</span>
              </label>

              <button type='button' className='font-medium text-yellow-500 hover:text-yellow-600 text-sm transition-colors'>
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            type='submit'
            className='bg-black hover:bg-gray-800 mt-2 py-3 rounded-xl w-full font-semibold text-white transition-colors'
          >
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <p className='mt-5 text-gray-500 text-sm text-center'>
          {mode === 'login' ? (
            <>
              Não tem uma conta?{' '}
              <button onClick={() => setMode('register')} className='font-semibold text-yellow-500 hover:text-yellow-600 transition-colors'>
                Criar conta
              </button>
            </>
          ) : (
            <>
              Já tem uma conta?{' '}
              <button onClick={() => setMode('login')} className='font-semibold text-yellow-500 hover:text-yellow-600 transition-colors'>
                Entrar
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;