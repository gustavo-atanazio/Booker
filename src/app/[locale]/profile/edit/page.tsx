'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Check, X, Plus } from 'lucide-react';

import currentUser from '@/data/user';
import ALL_GENRES from '@/data/genres';

function EditProfile() {
  const router = useRouter();
  const user = currentUser;

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [goal, setGoal] = useState(String(user.yearlyGoal));
  const [genres, setGenres] = useState<string[]>(user.favoriteGenres);
  const [saved, setSaved] = useState(false);

  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  function toggleGenre(g: string) {
    setGenres(prev => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  }

  function handleSave() {
    // TODO: call an API / Supabase
    setSaved(true);
    setTimeout(() => { router.push('/profile'); }, 1200);
  }

  const hasChanges =
    name !== user.name ||
    username !== user.username ||
    bio !== user.bio ||
    location !== user.location ||
    goal !== String(user.yearlyGoal) ||
    JSON.stringify(genres) !== JSON.stringify(user.favoriteGenres)
  ;

  return (
    <div className='bg-[#F5F5F5] pb-24 min-h-screen'>
      <div className='top-0 z-30 sticky bg-black'>
        <div className='flex justify-between items-center mx-auto px-4 max-w-lg h-14'>
          <button
            onClick={() => router.push('/profile')}
            className='flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors'
          >
            <ArrowLeft className='w-4 h-4'/>
            Cancelar
          </button>

          <span className='font-semibold text-white text-sm'>Editar Perfil</span>

          <button
            onClick={handleSave}
            disabled={!hasChanges || saved}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : hasChanges
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {saved ? (
              <><Check className='w-3.5 h-3.5'/> Salvo!</>
            ) : 'Salvar'}
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-5 mx-auto px-4 py-6 max-w-lg'>
        <div className='flex flex-col items-center gap-3'>
          <div className='relative'>
            <div className='flex justify-center items-center bg-yellow-400 shadow-lg rounded-full ring-4 ring-white w-24 h-24'>
              <span className='font-bold text-black text-3xl select-none'>{initials}</span>
            </div>

            <button className='-right-1 -bottom-1 absolute flex justify-center items-center bg-black hover:bg-gray-800 shadow rounded-full ring-2 ring-white w-8 h-8 text-white transition-colors'>
              <Camera className='w-3.5 h-3.5'/>
            </button>
          </div>

          <p className='text-gray-400 text-xs'>Toque para alterar a foto</p>
        </div>

        <div className='bg-white shadow-sm rounded-2xl divide-y divide-gray-100 overflow-hidden'>
          <div className='px-4 py-2.5'>
            <p className='mb-0.5 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Informações Básicas</p>
          </div>

          <label className='flex items-center gap-4 px-4 py-3.5'>
            <span className='flex-shrink-0 w-24 text-gray-500 text-sm'>Nome</span>

            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Seu nome completo'
              className='flex-1 bg-transparent focus:outline-none text-gray-900 text-sm placeholder-gray-300'
            />

            {name !== user.name && <X className='flex-shrink-0 w-3.5 h-3.5 text-gray-300 cursor-pointer' onClick={() => setName(user.name)} />}
          </label>

          <label className='flex items-center gap-4 px-4 py-3.5'>
            <span className='flex-shrink-0 w-24 text-gray-500 text-sm'>Usuário</span>

            <div className='flex flex-1 items-center gap-1'>
              <span className='text-gray-400 text-sm'>@</span>

              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                placeholder='seunome'
                className='flex-1 bg-transparent focus:outline-none text-gray-900 text-sm placeholder-gray-300'
              />
            </div>

            {username !== user.username && <X className='flex-shrink-0 w-3.5 h-3.5 text-gray-300 cursor-pointer' onClick={() => setUsername(user.username)} />}
          </label>

          <label className='flex items-center gap-4 px-4 py-3.5'>
            <span className='flex-shrink-0 w-24 text-gray-500 text-sm'>Localização</span>

            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='Cidade, Estado'
              className='flex-1 bg-transparent focus:outline-none text-gray-900 text-sm placeholder-gray-300'
            />

            {location !== user.location && <X className='flex-shrink-0 w-3.5 h-3.5 text-gray-300 cursor-pointer' onClick={() => setLocation(user.location)} />}
          </label>
        </div>

        <div className='bg-white shadow-sm rounded-2xl overflow-hidden'>
          <div className='px-4 pt-2.5 pb-1'>
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Bio</p>
          </div>

          <div className='px-4 pb-3'>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder='Conte um pouco sobre você e suas leituras...'
              className='bg-transparent focus:outline-none w-full text-gray-900 text-sm leading-relaxed resize-none placeholder-gray-300'
            />

            <div className='flex justify-end'>
              <span className={`text-[11px] ${bio.length > 180 ? 'text-red-400' : 'text-gray-300'}`}>
                {bio.length}/200
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-sm rounded-2xl overflow-hidden'>
          <div className='px-4 py-2.5 border-gray-100 border-b'>
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Meta de Leitura</p>
          </div>

          <div className='px-4 py-4'>
            <p className='mb-3 text-gray-600 text-sm'>Quantos livros você quer ler em 2026?</p>

            <div className='flex items-center gap-3'>
              <button
                onClick={() => setGoal(v => String(Math.max(1, Number(v) - 1)))}
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

                <p className='mt-1 text-gray-400 text-xs'>livros</p>
              </div>

              <button
                onClick={() => setGoal((v) => String(Math.min(365, Number(v) + 1)))}
                className='flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-full w-9 h-9 font-bold text-gray-700 transition-colors'
              >
                +
              </button>
            </div>

            <div className='flex flex-wrap justify-center gap-2 mt-4'>
              {[12, 24, 36, 52, 100].map(v => (
                <button
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
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Gêneros Favoritos</p>
            <span className='text-gray-300 text-xs'>{genres.length} selecionado{genres.length !== 1 ? 's' : ''}</span>
          </div>

          <div className='px-4 py-4'>
            <div className='flex flex-wrap gap-2'>
              {ALL_GENRES.map(g => {
                const active = genres.includes(g);

                return (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {active ? <X className='w-3 h-3'/> : <Plus className='w-3 h-3'/>}
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className='bg-white shadow-sm rounded-2xl divide-y divide-gray-100 overflow-hidden'>
          <div className='px-4 py-2.5'>
            <p className='font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Conta</p>
          </div>

          <button className='flex justify-between items-center hover:bg-gray-50 px-4 py-3.5 w-full text-gray-700 text-sm text-left transition-colors'>
            Alterar senha
            <ArrowLeft className='w-4 h-4 text-gray-300 rotate-180'/>
          </button>

          <button className='flex justify-between items-center hover:bg-gray-50 px-4 py-3.5 w-full text-gray-700 text-sm text-left transition-colors'>
            Notificações
            <ArrowLeft className='w-4 h-4 text-gray-300 rotate-180'/>
          </button>

          <button className='flex justify-between items-center hover:bg-gray-50 px-4 py-3.5 w-full text-gray-700 text-sm text-left transition-colors'>
            Privacidade
            <ArrowLeft className='w-4 h-4 text-gray-300 rotate-180'/>
          </button>
        </div>

        <div className='bg-white shadow-sm rounded-2xl divide-y divide-gray-100 overflow-hidden'>
          <button className='hover:bg-red-50 px-4 py-3.5 w-full font-medium text-red-500 text-sm text-left transition-colors'>
            Encerrar sessão
          </button>

          <button className='hover:bg-red-50 px-4 py-3.5 w-full text-red-400 text-sm text-left transition-colors'>
            Excluir conta
          </button>
        </div>

        <div className='h-4'/>
      </div>
    </div>
  );
}

export default EditProfile;