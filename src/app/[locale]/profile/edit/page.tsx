'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  ArrowLeft,
  Camera,
  Check,
  X,
  Plus,
  Lock,
  LogOut,
  Trash2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';

import { getGenresAction } from '@/actions/genre.actions';
import { useAuth } from '@/providers/AuthProvider';
import {
  updateUserAction,
  updatePasswordAction,
  deleteUserAction,
} from '@/actions/user.actions';
import { logoutAction } from '@/actions/auth.actions';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type Genre from '@/types/Genre';

function EditProfile() {
  const router = useRouter();
  const t = useTranslations('profile.editProfile');
  const tV = useTranslations('validation');
  const tErrors = useTranslations('errors');
  const { user: authUser } = useAuth();

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

  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
  const [name, setName] = useState(authUser?.name || '');
  const [username, setUsername] = useState(authUser?.username || '');
  const [bio, setBio] = useState(authUser?.bio || '');
  const [location, setLocation] = useState('São Paulo, SP');
  const [goal, setGoal] = useState('52');
  const [genres, setGenres] = useState<string[]>([
    'Ficção Científica',
    'Fantasia',
  ]);

  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();

  // Password change modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, startChangingPassword] = useTransition();

  // Delete account confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletingAccount, startDeletingAccount] = useTransition();

  useEffect(() => {
    getGenresAction().then(setAvailableGenres);
  }, []);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || '');
      setUsername(authUser.username || '');
      setBio(authUser.bio || '');
    }
  }, [authUser]);

  if (!authUser) {
    return (
      <div className='flex flex-col justify-center items-center gap-4 px-4 min-h-[60vh] text-center'>
        <p className='text-gray-600 text-base'>
          Você precisa estar conectado para editar seu perfil.
        </p>
        <Button onClick={() => router.push('/login?redirect=/profile/edit')}>
          Fazer Login
        </Button>
      </div>
    );
  }

  const initials = (name || authUser.name || 'U')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  function toggleGenre(g: string) {
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  function handleSave() {
    setErrorMessage(null);

    startSaving(async () => {
      const result = await updateUserAction(authUser!.id, {
        name: name.trim(),
        username: username.trim().toLowerCase(),
        bio: bio.trim(),
      });

      if (result.success) {
        setSaved(true);
        setTimeout(() => {
          router.push('/profile');
        }, 1000);
      } else {
        if (result.error?.code === 'USERNAME_ALREADY_EXISTS') {
          setErrorMessage(tV('usernameTaken'));
        } else {
          setErrorMessage(result.error?.message || tV('defaultError'));
        }
        setErrorMessage(resolveErrorMessage(result.error));
      }
    });
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordError(tV('passwordMismatch'));
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(tV('minLength', { min: 8 }));
      return;
    }

    if (!authUser) return;

    startChangingPassword(async () => {
      const result = await updatePasswordAction(authUser.id, {
        currentPassword,
        newPassword,
      });

      if (result.success) {
        setPasswordSuccess(t('passwordUpdated'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordSuccess(null);
        }, 1500);
      } else {
        if (result.error?.code === 'INCORRECT_PASSWORD') {
          setPasswordError(tV('invalidCredentials'));
        } else {
          setPasswordError(result.error?.message || tV('defaultError'));
        }
        setPasswordError(resolveErrorMessage(result.error));
      }
    });
  }

  function handleDeleteAccount() {
    if (!authUser) return;

    startDeletingAccount(async () => {
      const result = await deleteUserAction(authUser.id);
      if (result.success) {
        await logoutAction();
      } else {
        setErrorMessage(result.error?.message || tV('defaultError'));
        setErrorMessage(resolveErrorMessage(result.error));
        setIsDeleteModalOpen(false);
      }
    });
  }

  const hasChanges =
    name !== authUser.name ||
    username !== authUser.username ||
    bio !== (authUser.bio || '');

  return (
    <div className='bg-[#F5F5F5] pb-24 min-h-screen'>
      <div className='top-0 z-30 sticky bg-black'>
        <div className='flex justify-between items-center mx-auto px-4 max-w-lg h-14'>
          <button
            onClick={() => router.push('/profile')}
            className='flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            {t('cancel')}
          </button>

          <span className='font-semibold text-white text-sm'>{t('title')}</span>

          <button
            onClick={handleSave}
            disabled={!hasChanges || saved || isSaving}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : hasChanges
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <Loader2 className='w-3.5 h-3.5 animate-spin' />
            ) : saved ? (
              <>
                <Check className='w-3.5 h-3.5' /> {t('saved')}
              </>
            ) : (
              t('save')
            )}
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-5 mx-auto px-4 py-6 max-w-lg'>
        {errorMessage && (
          <div className='flex items-center gap-2 bg-red-50 p-3.5 border border-red-100 rounded-2xl text-red-600 text-sm'>
            <AlertCircle className='flex-shrink-0 w-4 h-4' />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className='flex flex-col items-center gap-3'>
          <div className='relative'>
            <div className='flex justify-center items-center bg-yellow-400 shadow-lg rounded-full ring-4 ring-white w-24 h-24'>
              <span className='font-bold text-black text-3xl select-none'>
                {initials}
              </span>
            </div>

            <button
              className='-right-1 -bottom-1 absolute flex justify-center items-center bg-black hover:bg-gray-800 shadow rounded-full ring-2 ring-white w-8 h-8 text-white transition-colors'
              aria-label={t('changePhoto')}
            >
              <Camera className='w-3.5 h-3.5' />
            </button>
          </div>

          <p className='text-gray-400 text-xs'>{t('changePhoto')}</p>
        </div>

        <div className='bg-white shadow-sm rounded-2xl divide-y divide-gray-100 overflow-hidden'>
          <div className='px-4 py-2.5'>
            <p className='mb-0.5 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
              {t('basicInfo')}
            </p>
          </div>

          <label className='flex items-center gap-4 px-4 py-3.5'>
            <span className='flex-shrink-0 w-24 text-gray-500 text-sm'>{t('name')}</span>

            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className='flex-1 bg-transparent focus:outline-none text-gray-900 text-sm placeholder-gray-300'
            />

            {name !== authUser.name && (
              <X
                className='flex-shrink-0 w-3.5 h-3.5 text-gray-300 cursor-pointer'
                onClick={() => setName(authUser.name)}
              />
            )}
          </label>

          <label className='flex items-center gap-4 px-4 py-3.5'>
            <span className='flex-shrink-0 w-24 text-gray-500 text-sm'>{t('username')}</span>

            <div className='flex flex-1 items-center gap-1'>
              <span className='text-gray-400 text-sm'>@</span>

              <input
                type='text'
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))
                }
                placeholder={t('usernamePlaceholder')}
                className='flex-1 bg-transparent focus:outline-none text-gray-900 text-sm placeholder-gray-300'
              />
            </div>

            {username !== authUser.username && (
              <X
                className='flex-shrink-0 w-3.5 h-3.5 text-gray-300 cursor-pointer'
                onClick={() => setUsername(authUser.username)}
              />
            )}
          </label>

          <label className='flex items-center gap-4 px-4 py-3.5'>
            <span className='flex-shrink-0 w-24 text-gray-500 text-sm'>{t('location')}</span>

            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t('locationPlaceholder')}
              className='flex-1 bg-transparent focus:outline-none text-gray-900 text-sm placeholder-gray-300'
            />
          </label>
        </div>

        <div className='bg-white shadow-sm rounded-2xl overflow-hidden'>
          <div className='px-4 pt-2.5 pb-1'>
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
              {t('bio')}
            </p>
          </div>

          <div className='px-4 pb-3'>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder={t('bioPlaceholder')}
              className='bg-transparent focus:outline-none w-full text-gray-900 text-sm leading-relaxed resize-none placeholder-gray-300'
            />

            <div className='flex justify-end'>
              <span
                className={`text-[11px] ${
                  bio.length > 180 ? 'text-red-400' : 'text-gray-300'
                }`}
              >
                {bio.length}/200
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-sm rounded-2xl overflow-hidden'>
          <div className='px-4 py-2.5 border-gray-100 border-b'>
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
              {t('readingGoal')}
            </p>
          </div>

          <div className='px-4 py-4'>
            <p className='mb-3 text-gray-600 text-sm'>
              {t('readingGoalPrompt', { year: 2026 })}
            </p>

            <div className='flex items-center gap-3'>
              <button
                type='button'
                onClick={() => setGoal((v) => String(Math.max(1, Number(v) - 1)))}
                className='flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-full w-9 h-9 font-bold text-gray-700 transition-colors'
              >
                −
              </button>
              <div className='flex-1 text-center'>
                <input
                  type='number'
                  min={1}
                  max={365}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className='bg-transparent focus:outline-none w-20 font-bold text-gray-900 text-3xl text-center'
                />

                <p className='mt-1 text-gray-400 text-xs'>{t('books')}</p>
              </div>

              <button
                type='button'
                onClick={() => setGoal((v) => String(Math.min(365, Number(v) + 1)))}
                className='flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-full w-9 h-9 font-bold text-gray-700 transition-colors'
              >
                +
              </button>
            </div>

            <div className='flex flex-wrap justify-center gap-2 mt-4'>
              {[12, 24, 36, 52, 100].map((v) => (
                <button
                  type='button'
                  key={v}
                  onClick={() => setGoal(String(v))}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    goal === String(v)
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-white shadow-sm rounded-2xl overflow-hidden'>
          <div className='flex justify-between items-center px-4 py-2.5 border-gray-100 border-b'>
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
              {t('favoriteGenres')}
            </p>
            <span className='text-gray-300 text-xs'>
              {t('selectedCount', { count: genres.length })}
            </span>
          </div>

          <div className='px-4 py-4'>
            <div className='flex flex-wrap gap-2'>
              {availableGenres.map((g) => {
                const active = genres.includes(g.name);

                return (
                  <button
                    type='button'
                    key={g.id}
                    onClick={() => toggleGenre(g.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {active ? <X className='w-3 h-3' /> : <Plus className='w-3 h-3' />}
                    {g.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className='bg-white shadow-sm rounded-2xl divide-y divide-gray-100 overflow-hidden'>
          <div className='px-4 py-2.5'>
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
              {t('account')}
            </p>
          </div>

          <button
            type='button'
            onClick={() => setIsPasswordModalOpen(true)}
            className='flex justify-between items-center hover:bg-gray-50 px-4 py-3.5 w-full text-gray-700 text-sm text-left transition-colors'
          >
            <div className='flex items-center gap-2'>
              <Lock className='w-4 h-4 text-gray-400' />
              <span>{t('changePassword')}</span>
            </div>
            <ArrowLeft className='w-4 h-4 text-gray-300 rotate-180' />
          </button>
        </div>

        <div className='bg-white shadow-sm rounded-2xl divide-y divide-gray-100 overflow-hidden'>
          <form action={logoutAction} className='w-full'>
            <button
              type='submit'
              className='flex items-center gap-2 hover:bg-red-50 px-4 py-3.5 w-full font-medium text-red-500 text-sm text-left transition-colors'
            >
              <LogOut className='w-4 h-4' />
              <span>{t('logout')}</span>
            </button>
          </form>

          <button
            type='button'
            onClick={() => setIsDeleteModalOpen(true)}
            className='flex items-center gap-2 hover:bg-red-50 px-4 py-3.5 w-full text-red-400 text-sm text-left transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            <span>{t('deleteAccount')}</span>
          </button>
        </div>

        <div className='h-4' />
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{t('changePassword')}</DialogTitle>
            <DialogDescription>
              Digite sua senha atual e escolha uma nova senha segura.
            </DialogDescription>
          </DialogHeader>

          {passwordSuccess && (
            <div className='flex items-center gap-2 bg-green-50 p-3 border border-green-200 rounded-xl text-green-700 text-sm'>
              <Check className='w-4 h-4' />
              <span>{passwordSuccess}</span>
            </div>
          )}

          {passwordError && (
            <div className='flex items-center gap-2 bg-red-50 p-3 border border-red-200 rounded-xl text-red-600 text-sm'>
              <AlertCircle className='w-4 h-4' />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className='space-y-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='currentPassword'>{t('currentPassword')}</Label>
              <Input
                id='currentPassword'
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                disabled={isChangingPassword}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='newPassword'>{t('newPassword')}</Label>
              <div className='relative'>
                <Input
                  id='newPassword'
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isChangingPassword}
                  className='pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((p) => !p)}
                  className='top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2'
                >
                  {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </button>
              </div>
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='confirmNewPassword'>{t('confirmNewPassword')}</Label>
              <Input
                id='confirmNewPassword'
                type={showPassword ? 'text' : 'password'}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                disabled={isChangingPassword}
              />
            </div>

            <DialogFooter className='gap-2 sm:gap-0 mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsPasswordModalOpen(false)}
                disabled={isChangingPassword}
              >
                {t('cancel')}
              </Button>
              <Button
                type='submit'
                disabled={isChangingPassword || !currentPassword || !newPassword}
              >
                {isChangingPassword && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
                {t('updatePassword')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-red-600'>{t('deleteAccount')}</DialogTitle>
            <DialogDescription>
              {t('deleteAccountConfirm')}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='gap-2 sm:gap-0 mt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeletingAccount}
            >
              {t('cancel')}
            </Button>
            <Button
              type='button'
              variant='destructive'
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
            >
              {isDeletingAccount && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
              {t('confirmDelete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditProfile;