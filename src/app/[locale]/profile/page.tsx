'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Heart, MessageCircle, Bookmark, Star, BookOpen, Clock, TrendingUp, ChevronRight } from 'lucide-react';

import ImageWithFallback from '@/components/ImageWithFallback';
import StarRow from './_components/StarRow';

import currentUser from '@/data/user';
import { books } from '@/data/books';
import activities from '@/data/activities';

import type Book from '@/types/Book';

type MainTab = 'atividade' | 'livros';
type BookShelf = 'lendo' | 'lidos' | 'quero';

function getBooks(ids: string[]) {
  return ids.map(id => books.find(b => b.id === id)).filter(Boolean) as Book[];
}

const reviews = activities.filter(a => a.action === 'reviewed' || a.action === 'finished');

function Profile() {
  const [mainTab, setMainTab] = useState<MainTab>('atividade');
  const [shelf, setShelf] = useState<BookShelf>('lendo');
  const user = currentUser;

  const progressPercent = Math.min(100, Math.round((user.yearlyProgress / user.yearlyGoal) * 100));

  const shelfBooks =
    shelf === 'lendo' ? getBooks(user.currentlyReading) :
    shelf === 'lidos' ? getBooks(user.readBooks) :
    getBooks(user.wantToRead)
  ;

  return (
    <div className='bg-white pb-24 min-h-screen'>
      <div className='bg-black'>
        <div className='mx-auto px-5 pt-6 pb-0 max-w-5xl'>
          <div className='flex items-start gap-5'>
            <div className='relative flex-shrink-0'>
              <div className='flex justify-center items-center bg-yellow-400 rounded-full ring-2 ring-yellow-400/50 w-20 h-20 overflow-hidden'>
                <span className='font-bold text-black text-2xl select-none'>
                  {user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </span>
              </div>

              <div className='-right-1 -bottom-1 absolute flex justify-center items-center bg-yellow-400 border-2 border-black rounded-full w-5 h-5 font-black text-[10px] text-black'>
                B
              </div>
            </div>

            <div className='flex-1 min-w-0'>
              <h1 className='font-bold text-white text-xl leading-tight'>{user.name}</h1>
              <p className='mt-0.5 text-yellow-400 text-sm'>@{user.username}</p>

              <p className='mt-2 max-w-md text-gray-400 text-sm leading-relaxed'>
                {user.bio}
              </p>

              <div className='flex flex-wrap gap-4 mt-2.5'>
                <div className='flex items-center gap-1.5 text-gray-500 text-xs'>
                  <MapPin className='w-3.5 h-3.5'/>
                  {user.location}
                </div>

                <div className='flex items-center gap-1.5 text-gray-500 text-xs'>
                  <Calendar className='w-3.5 h-3.5'/>
                  Desde {user.joinDate}
                </div>
              </div>
            </div>

            <Link
              href='/profile/edit'
              className='flex-shrink-0 hover:bg-white/10 px-4 py-2 border border-white/30 rounded font-semibold text-white text-xs transition-colors'
            >
              Editar
            </Link>
          </div>

          <div className='flex gap-8 mt-6 pb-5'>
            <div>
              <div className='font-bold text-yellow-400 text-lg leading-none'>{user.booksRead}</div>
              <div className='mt-1 text-gray-500 text-xs'>Lidos</div>
            </div>

            <div>
              <div className='font-bold text-yellow-400 text-lg leading-none'>{user.currentlyReading.length}</div>
              <div className='mt-1 text-gray-500 text-xs'>Lendo</div>
            </div>

            <div>
              <div className='font-bold text-yellow-400 text-lg leading-none'>{user.wantToRead.length}</div>
              <div className='mt-1 text-gray-500 text-xs'>Quero Ler</div>
            </div>

            <div>
              <div className='font-bold text-yellow-400 text-lg leading-none'>{user.avgRating.toFixed(1)}</div>
              <div className='mt-1 text-gray-500 text-xs'>Nota Média</div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white border-gray-100 border-b'>
        <div className='mx-auto px-5 max-w-5xl'>
          <div className='flex flex-wrap gap-2 py-4'>
            {user.favoriteGenres.slice(0, 5).map(genre => (
              <Link
                key={genre}
                href={`/search?genre=${encodeURIComponent(genre)}`}
                className='bg-yellow-400 hover:bg-yellow-300 px-3 py-1.5 rounded-full font-semibold text-black text-xs transition-colors'
              >
                {genre}
              </Link>
            ))}
          </div>

          <div className='flex gap-6 border-gray-100 border-t'>
            {(['atividade', 'livros'] as MainTab[]).map(t => (
              <button
                key={t}
                onClick={() => setMainTab(t)}
                className={`py-3 text-sm font-semibold border-b-2 transition-colors capitalize ${
                  mainTab === t
                    ? 'text-yellow-500 border-yellow-400'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                {t === 'atividade' ? 'Atividade' : 'Livros'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='mx-auto px-5 py-6 max-w-5xl'>
        {mainTab === 'atividade' && (
          <div className='flex lg:flex-row flex-col gap-8'>
            <div className='flex-1 min-w-0'>
              <h2 className='mb-5 font-semibold text-gray-400 text-xs uppercase tracking-widest'>
                Resenhas Recentes
              </h2>

              <div className='flex flex-col divide-y divide-gray-100'>
                {reviews.map(activity => (
                  <div key={activity.id} className='py-5 first:pt-0'>
                    <div className='flex justify-between items-center mb-3'>
                      <div className='flex items-center gap-2.5'>
                        <div className={`w-8 h-8 rounded-full ${activity.user.color} flex items-center justify-center flex-shrink-0`}>
                          <span className='font-bold text-white text-xs'>{activity.user.initials}</span>
                        </div>

                        <div>
                          <div className='flex flex-wrap items-center gap-1.5'>
                            <span className='font-semibold text-gray-900 text-sm'>{activity.user.name}</span>
                            <span className='text-gray-400 text-xs'>avaliou</span>
                          </div>

                          <span className='text-gray-400 text-xs'>{activity.date}</span>
                        </div>
                      </div>

                      {activity.rating && <StarRow rating={activity.rating}/>}
                    </div>

                    <Link href={`/book/${activity.book.id}`} className='group flex gap-3 mb-3'>
                      <ImageWithFallback
                        src={activity.book.coverUrl}
                        alt={activity.book.title}
                        className='flex-shrink-0 group-hover:opacity-90 rounded-lg w-12 h-16 object-cover transition-opacity'
                      />

                      <div className='flex flex-col flex-1 justify-center min-w-0'>
                        <p className='font-semibold text-gray-900 group-hover:text-yellow-600 text-sm truncate transition-colors'>
                          {activity.book.title}
                        </p>

                        <p className='mt-0.5 text-gray-500 text-xs'>{activity.book.author}</p>

                        <span className='inline-block bg-gray-100 mt-1.5 px-2 py-0.5 rounded-full w-fit font-medium text-[11px] text-gray-600'>
                          {activity.book.genre}
                        </span>
                      </div>
                    </Link>

                    {activity.excerpt && (
                      <p className='mb-3 text-gray-500 text-sm italic leading-relaxed'>
                        {activity.excerpt}
                      </p>
                    )}

                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-4'>
                        <button className='flex items-center gap-1.5 text-gray-400 hover:text-rose-500 text-xs transition-colors'>
                          <Heart className='w-4 h-4'/>
                          {activity.likes}
                        </button>

                        <button className='flex items-center gap-1.5 text-gray-400 hover:text-blue-500 text-xs transition-colors'>
                          <MessageCircle className='w-4 h-4'/>
                          {activity.comments}
                        </button>
                      </div>

                      <button className='text-gray-300 hover:text-yellow-400 transition-colors'>
                        <Bookmark className='w-4 h-4'/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className='flex flex-col flex-shrink-0 gap-5 lg:w-64'>
              <div>
                <h3 className='mb-4 font-semibold text-gray-400 text-xs uppercase tracking-widest'>
                  Estatísticas
                </h3>

                <div className='flex flex-col gap-3'>
                  {[
                    { label: 'Páginas Lidas', value: '94.2K', highlight: false },
                    { label: 'Média de Páginas', value: '387', highlight: false },
                    { label: 'Autor Mais Lido', value: 'Tolkien', highlight: true },
                    { label: 'Livros Este Ano', value: String(user.yearlyProgress), highlight: false },
                    { label: 'Gênero Favorito', value: 'Fantasia', highlight: true }
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className='flex justify-between items-center py-2 border-gray-100 border-b'>
                      <span className='text-gray-500 text-sm'>{label}</span>

                      <span className={`text-sm font-semibold ${highlight ? 'text-yellow-500' : 'text-gray-900'}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-black p-4 rounded-2xl'>
                <div className='flex items-center gap-2 mb-2'>
                  <BookOpen className='w-4 h-4 text-yellow-400'/>
                  <h3 className='font-bold text-white text-sm'>Diário de Leitura</h3>
                </div>

                <p className='mb-3 text-gray-400 text-xs leading-relaxed'>
                  Você leu{' '}
                  <span className='font-semibold text-yellow-400'>{user.yearlyProgress} livros</span>{' '}
                  este ano. Continue assim!
                </p>

                <div className='bg-white/10 mb-2 rounded-full w-full h-1.5'>
                  <div
                    className='bg-yellow-400 rounded-full h-1.5'
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className='text-gray-500 text-xs'>
                  {user.yearlyProgress}/{user.yearlyGoal} livros da meta anual
                </p>
              </div>

              <div className='bg-gray-50 p-4 rounded-2xl'>
                <div className='flex items-center gap-2 mb-3'>
                  <TrendingUp className='w-4 h-4 text-yellow-500'/>
                  <h3 className='font-bold text-gray-900 text-sm'>Meta 2026</h3>
                </div>

                <div className='flex justify-between items-end mb-2'>
                  <span className='text-gray-500 text-xs'>{user.yearlyProgress} de {user.yearlyGoal}</span>
                  <span className='font-bold text-yellow-500 text-sm'>{progressPercent}%</span>
                </div>

                <div className='bg-gray-200 rounded-full w-full h-2'>
                  <div
                    className='bg-yellow-400 rounded-full h-2 transition-all'
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className='mt-2 text-gray-400 text-xs'>
                  {user.yearlyGoal - user.yearlyProgress} livros restantes
                </p>
              </div>
            </aside>
          </div>
        )}

        {mainTab === 'livros' && (
          <div>
            <div className='flex flex-wrap gap-2 mb-6'>
              {([
                { key: 'lendo' as BookShelf, label: 'Lendo Agora', count: user.currentlyReading.length, icon: Clock },
                { key: 'lidos' as BookShelf, label: 'Já Li', count: user.readBooks.length, icon: Star },
                { key: 'quero' as BookShelf, label: 'Quero Ler', count: user.wantToRead.length, icon: Bookmark }
              ]).map(({ key, label, count, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setShelf(key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    shelf === key
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Icon className='w-3.5 h-3.5'/>
                  {label} ({count})
                </button>
              ))}
            </div>

            {shelfBooks.length === 0 ? (
              <div className='py-20 text-center'>
                <div className='mb-4 text-5xl'>📖</div>
                <h3 className='mb-1 font-semibold text-gray-900 text-base'>Nenhum livro aqui ainda</h3>
                <p className='mt-1 text-gray-500 text-sm'>Explore e adicione à sua prateleira.</p>

                <Link
                  href='/search'
                  className='inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 mt-5 px-5 py-2.5 rounded-full font-semibold text-black text-sm transition-colors'
                >
                  Explorar livros <ChevronRight className='w-4 h-4'/>
                </Link>
              </div>
            ) : (
              <div className='gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {shelfBooks.map(book => (
                  <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    className='group block'
                  >
                    <div
                      className='relative shadow-sm group-hover:shadow-md rounded-xl overflow-hidden transition-shadow'
                      style={{ aspectRatio: '2/3' }}
                    >
                      <ImageWithFallback
                        src={book.coverUrl}
                        alt={book.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      />

                      {shelf === 'lidos' && (
                        <div className='top-2 right-2 absolute bg-yellow-400 p-0.5 rounded-full'>
                          <Star className='fill-black w-3 h-3 text-black'/>
                        </div>
                      )}

                      {shelf === 'lendo' && (
                        <div className='bottom-0 absolute inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2'>
                          <div className='bg-white/30 rounded-full w-full h-1'>
                            <div className='bg-yellow-400 rounded-full h-1' style={{ width: '40%' }} />
                          </div>
                        </div>
                      )}
                    </div>

                    <p className='mt-2 font-semibold text-gray-900 text-sm truncate'>{book.title}</p>
                    <p className='text-gray-500 text-xs truncate'>{book.author}</p>
                    <p className='text-gray-400 text-xs'>{book.year}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;