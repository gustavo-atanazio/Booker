'use client';

import { useState, useTransition, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

import Logo from '@/components/Logo';
import { loginAction, registerAction } from '@/actions/auth.actions';
import { createLoginSchema, createRegisterSchema } from '@/lib/validation/auth.schema';

type Mode = 'login' | 'register';

function LoginContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || undefined;

  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isPending, startTransition] = useTransition();

  const t = useTranslations('login');
  const tV = useTranslations('validation');
  const tErrors = useTranslations('errors');

  const resolveErrorMessage = (error?: {
    code?: string;
    message?: string;
    meta?: Record<string, string | number>;
  }) => {
    if (!error) return '';
    const code = error.code ?? 'DEFAULT';
    if (tErrors.has(code)) {
      return tErrors(code, error.meta);
    }
    return error.message || tErrors('DEFAULT');
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setServerError(null);
    setFieldErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    if (mode === 'login') {
      const loginSchema = createLoginSchema(tV);
      const parseResult = loginSchema.safeParse({
        usernameOrEmail: usernameOrEmail.trim(),
        password,
      });

      if (!parseResult.success) {
        const errors: Record<string, string[]> = {};
        for (const issue of parseResult.error.issues) {
          const field = issue.path[0] as string;
          if (!errors[field]) errors[field] = [];
          errors[field].push(issue.message);
        }
        setFieldErrors(errors);
        return;
      }
    } else {
      const registerSchema = createRegisterSchema(tV);
      const parseResult = registerSchema.safeParse({
        name: name.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim(),
        password,
        confirmPassword: password,
      });

      if (!parseResult.success) {
        const errors: Record<string, string[]> = {};
        for (const issue of parseResult.error.issues) {
          const field = issue.path[0] as string;
          if (!errors[field]) errors[field] = [];
          errors[field].push(issue.message);
        }
        setFieldErrors(errors);
        return;
      }
    }

    startTransition(async () => {
      if (mode === 'login') {
        const result = await loginAction(
          {
            usernameOrEmail: usernameOrEmail.trim(),
            password,
          },
          redirectTo
        );

        if (result && !result.success && result.error) {
          if (result.error.fieldErrors) {
            setFieldErrors(result.error.fieldErrors);
          }
          setServerError(resolveErrorMessage(result.error));
        }
      } else {
        const result = await registerAction({
          name: name.trim(),
          username: username.trim().toLowerCase(),
          email: email.trim(),
          password,
        });

        if (result && !result.success && result.error) {
          if (result.error.fieldErrors) {
            setFieldErrors(result.error.fieldErrors);
          }
          setServerError(resolveErrorMessage(result.error));
        }
      }
    });
  };

  return (
    <div className='flex flex-col justify-center items-center bg-black px-4 py-12 pb-28 md:pb-12 min-h-screen'>
      <Link href='/' className='mb-8'>
        <Logo size='lg' />
      </Link>

      <div className='bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md'>
        <div className='flex bg-gray-100 mb-6 p-1 rounded-full'>
          <button
            type='button'
            onClick={() => handleModeChange('login')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              mode === 'login'
                ? 'bg-black text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('tabLogin')}
          </button>

          <button
            type='button'
            onClick={() => handleModeChange('register')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              mode === 'register'
                ? 'bg-black text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('tabRegister')}
          </button>
        </div>

        {serverError && (
          <div className='flex items-center gap-2 bg-red-50 mb-5 p-3.5 border border-red-100 rounded-xl text-red-600 text-sm'>
            <AlertCircle className='flex-shrink-0 w-4 h-4' />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {mode === 'register' && (
            <>
              <div>
                <label className='block mb-1.5 font-medium text-gray-700 text-sm'>
                  {t('name')}
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  required
                  disabled={isPending}
                  className='bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
                />
                {fieldErrors.name && (
                  <p className='mt-1 text-red-500 text-xs'>{fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <label className='block mb-1.5 font-medium text-gray-700 text-sm'>
                  {t('username')}
                </label>
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                  placeholder={t('usernamePlaceholder')}
                  required
                  disabled={isPending}
                  className='bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
                />
                {fieldErrors.username && (
                  <p className='mt-1 text-red-500 text-xs'>{fieldErrors.username[0]}</p>
                )}
              </div>

              <div>
                <label className='block mb-1.5 font-medium text-gray-700 text-sm'>
                  {t('email')}
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  required
                  disabled={isPending}
                  className='bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
                />
                {fieldErrors.email && (
                  <p className='mt-1 text-red-500 text-xs'>{fieldErrors.email[0]}</p>
                )}
              </div>
            </>
          )}

          {mode === 'login' && (
            <div>
              <label className='block mb-1.5 font-medium text-gray-700 text-sm'>
                {t('usernameOrEmail')}
              </label>
              <input
                type='text'
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder={t('usernameOrEmailPlaceholder')}
                required
                disabled={isPending}
                className='bg-white px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
              />
              {fieldErrors.usernameOrEmail && (
                <p className='mt-1 text-red-500 text-xs'>
                  {fieldErrors.usernameOrEmail[0]}
                </p>
              )}
            </div>
          )}

          <div>
            <label className='block mb-1.5 font-medium text-gray-700 text-sm'>
              {t('password')}
            </label>

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                required
                disabled={isPending}
                className='bg-white px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
              />

              <button
                type='button'
                onClick={() => setShowPassword((p) => !p)}
                className='top-1/2 right-3.5 absolute text-gray-400 hover:text-gray-600 transition-colors -translate-y-1/2'
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className='mt-1 text-red-500 text-xs'>{fieldErrors.password[0]}</p>
            )}
          </div>

          {mode === 'login' && (
            <div className='flex justify-between items-center'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={isPending}
                  className='border-gray-300 rounded w-4 h-4 accent-yellow-400'
                />
                <span className='text-gray-600 text-sm'>{t('rememberMe')}</span>
              </label>

              <button
                type='button'
                className='font-medium text-yellow-500 hover:text-yellow-600 text-sm transition-colors'
              >
                {t('forgotPassword')}
              </button>
            </div>
          )}

          <button
            type='submit'
            disabled={isPending}
            className='flex justify-center items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-50 mt-2 py-3 rounded-xl w-full font-semibold text-white transition-colors'
          >
            {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
            {isPending
              ? mode === 'login'
                ? t('submitting')
                : t('creatingAccount')
              : mode === 'login'
              ? t('submit')
              : t('createAccountSubmit')}
          </button>
        </form>

        <p className='mt-5 text-gray-500 text-sm text-center'>
          {mode === 'login' ? (
            <>
              {t('noAccount')}{' '}
              <button
                type='button'
                onClick={() => handleModeChange('register')}
                className='font-semibold text-yellow-500 hover:text-yellow-600 transition-colors'
              >
                {t('tabRegister')}
              </button>
            </>
          ) : (
            <>
              {t('hasAccount')}{' '}
              <button
                type='button'
                onClick={() => handleModeChange('login')}
                className='font-semibold text-yellow-500 hover:text-yellow-600 transition-colors'
              >
                {t('tabLogin')}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}