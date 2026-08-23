'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Users, Star, TrendingUp, ArrowRight } from 'lucide-react';

import ActivityCard from '@/components/ActivityCard';
import ImageWithFallback from '@/components/ImageWithFallback';

import activities from '@/data/activities';

import { loadData } from '@/services/api';

import { PUBLIC_ENDPOINT, BOOKS_ENDPOINT, GENRES_ENDPOINT } from '@/constants/api';

import type { BookSummary } from '@/types/Book';
import type Genre from '@/types/Genre';

function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    loadData<BookSummary>(PUBLIC_ENDPOINT + BOOKS_ENDPOINT, setBooks);
    loadData<Genre>(PUBLIC_ENDPOINT + GENRES_ENDPOINT, setGenres);
  }, []);

  useEffect(() => {
    if (books.length === 0) return;

    const interval = setInterval(() => {
      setFading(true);

      setTimeout(() => {
        setBgIndex(prev => (prev + 1) % books.length);
        setFading(false);
      }, 600);
    }, 5500);

    return () => clearInterval(interval);
  }, [books.length]);

  const featured = books.length > 0 ? books[bgIndex] : null;

  return (
    <div className='pb-24 md:pb-8'>
      <section className='relative bg-black overflow-hidden text-white' style={{ minHeight: '88vh' }}>

        {books.map((book, i) => (
          <div
            key={book.id}
            className='absolute inset-0 transition-opacity duration-1000'
            style={{ opacity: i === bgIndex ? 1 : 0 }}
          >
            <ImageWithFallback
              src={book.coverUrl}
              alt=''
              className='w-full h-full object-cover'
              style={{
                filter: 'blur(18px) brightness(0.18) saturate(1.4)',
                transform: 'scale(1.08)'
              }}
            />
          </div>
        ))}

        <div className='absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10'/>
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50'/>

        <div className='z-10 relative flex items-center mx-auto px-4 max-w-7xl h-full' style={{ minHeight: '88vh' }}>
          <div className='flex items-center gap-8 py-16 w-full'>
            <div className='flex-1 max-w-2xl'>
              <span className='inline-block mb-3 font-semibold text-yellow-400 text-xs uppercase tracking-widest'>
                A rede social dos leitores
              </span>

              <h1 className='mb-4 font-bold text-4xl md:text-6xl leading-tight'>
                Seus livros.<br/>Sua história.
              </h1>

              <p className='mb-8 max-w-lg text-gray-300 text-base md:text-lg'>
                Registre o que você lê, descubra novos livros e compartilhe resenhas com outros apaixonados por literatura.
              </p>

              <div className='flex flex-wrap gap-3 mb-12'>
                <Link
                  href='/search'
                  className='bg-yellow-400 hover:bg-yellow-300 px-6 py-3 rounded-full font-semibold text-black transition-colors'
                >
                  Explorar Livros
                </Link>

                <Link
                  href='/login'
                  className='hover:bg-white/10 px-6 py-3 border border-white/30 rounded-full font-semibold text-white transition-colors'
                >
                  Entrar
                </Link>
              </div>

              <div className='flex gap-8'>
                <div>
                  <div className='flex items-center gap-1.5 mb-1 text-yellow-400'>
                    <BookOpen className='w-4 h-4'/>
                    <span className='font-bold text-xl'>12.4k</span>
                  </div>

                  <p className='text-gray-500 text-xs uppercase tracking-wide'>Livros</p>
                </div>

                <div>
                  <div className='flex items-center gap-1.5 mb-1 text-yellow-400'>
                    <Users className='w-4 h-4'/>
                    <span className='font-bold text-xl'>87.2k</span>
                  </div>

                  <p className='text-gray-500 text-xs uppercase tracking-wide'>Leitores</p>
                </div>

                <div>
                  <div className='flex items-center gap-1.5 mb-1 text-yellow-400'>
                    <Star className='fill-yellow-400 w-4 h-4'/>
                    <span className='font-bold text-xl'>341k</span>
                  </div>

                  <p className='text-gray-500 text-xs uppercase tracking-wide'>Avaliações</p>
                </div>
              </div>

              <div className='flex gap-2 mt-10'>
                {books.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setFading(false); setBgIndex(i); }}
                    className={`h-[3px] rounded-full transition-all duration-400 ${
                      i === bgIndex ? 'w-7 bg-yellow-400' : 'w-2.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {featured && (
              <div className='hidden lg:flex flex-col flex-shrink-0 items-center w-52 xl:w-60'>
                <div className='flex items-center self-start gap-1.5 mb-3'>
                  <span className='bg-yellow-400 rounded-full w-1 h-4' />
                  <span className='font-semibold text-yellow-400 text-xs uppercase tracking-widest'>Em Destaque</span>
                </div>

                <Link
                  href={`/book/${featured.id}`}
                  className={`block w-full relative transition-opacity duration-600 ${fading ? 'opacity-0' : 'opacity-100'}`}
                >
                  <div
                    className='absolute -inset-3 opacity-30 blur-xl rounded-3xl transition-all duration-1000'
                    style={{ background: 'radial-gradient(ellipse, #FACC15 0%, transparent 70%)' }}
                  />

                  <div className='group relative shadow-2xl rounded-2xl ring-1 ring-white/10 overflow-hidden'>
                    <ImageWithFallback
                      src={featured.coverUrl}
                      alt={featured.title}
                      className='w-full object-cover group-hover:scale-105 transition-transform duration-500'
                      style={{ aspectRatio: '2/3' }}
                    />

                    <div className='absolute inset-0 flex justify-center items-end bg-black/0 group-hover:bg-black/50 pb-5 transition-colors duration-300'>
                      <div className='flex items-center gap-1.5 bg-yellow-400 opacity-0 group-hover:opacity-100 px-4 py-2 rounded-full font-bold text-black text-xs transition-opacity duration-300'>
                        Ver mais <ArrowRight className='w-3.5 h-3.5'/>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className={`mt-4 w-full transition-opacity duration-600 ${fading ? 'opacity-0' : 'opacity-100'}`}>
                  <p className='font-bold text-white text-sm truncate'>{featured.title}</p>
                  <p className='mt-0.5 text-gray-400 text-xs'>{featured.authorName}</p>

                  <div className='flex items-center gap-1.5 mt-2'>
                    <Star className='fill-yellow-400 w-3 h-3 text-yellow-400'/>

                    <span className='font-bold text-yellow-400 text-xs'>{featured.rating.toFixed(1)}</span>

                    {featured.genres.map((genre, i) => (
                      <span className='text-gray-600 text-xs' key={i}>
                        · {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='bottom-0 absolute inset-x-0 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/60 to-transparent h-40'/>
      </section>

      <section className='bg-[#F5F5F5] pt-2 pb-6'>
        <div className='mx-auto px-4 max-w-7xl'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-2'>
              <TrendingUp className='w-4 h-4 text-yellow-500'/>

              <h2 className='font-bold text-gray-900 text-xs uppercase tracking-widest'>
                Populares da Semana
              </h2>
            </div>

            <Link
              href='/search'
              className='flex items-center gap-1 font-semibold text-yellow-500 hover:text-yellow-600 text-xs transition-colors'
            >
              Ver todos <ArrowRight className='w-3 h-3'/>
            </Link>
          </div>

          <div
            className='flex gap-3 -mx-4 px-4 overflow-x-auto'
            style={{ scrollbarWidth: 'none' }}
          >
            {books.map((book, idx) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className='group flex-shrink-0 w-[90px]'
              >
                <div className='relative rounded-xl overflow-hidden' style={{ aspectRatio: '2/3' }}>
                  <ImageWithFallback
                    src={book.coverUrl}
                    alt={book.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />

                  <div className='right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/80 to-transparent px-2 pt-6 pb-1.5'>
                    <span className='font-black text-white/60 text-lg leading-none'>
                      {idx + 1}
                    </span>
                  </div>

                  <div className='top-1.5 right-1.5 absolute flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full'>
                    <Star className='fill-yellow-400 w-2.5 h-2.5 text-yellow-400'/>

                    <span className='font-bold text-[10px] text-white'>{book.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className='mt-1.5 font-medium text-[11px] text-gray-900 truncate'>{book.title}</p>
                <p className='text-[10px] text-gray-500 truncate'>{book.authorName}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className='bg-[#F5F5F5] mx-auto px-4 pb-8 max-w-7xl'>
        <div className='flex lg:flex-row flex-col gap-8'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-5'>
              <h2 className='font-bold text-gray-900 text-xs uppercase tracking-widest'>
                Atividade Recente
              </h2>
            </div>

            <div className='flex flex-col gap-4'>
              {activities.map(activity => <ActivityCard key={activity.id} activity={activity}/>)}
            </div>
          </div>

          <aside className='flex flex-col flex-shrink-0 gap-6 lg:w-80'>
            <div className='bg-white p-4 border border-gray-100 rounded-2xl'>
              <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                Clássicos Imperdíveis
              </h3>

              <div className='flex flex-col gap-4'>
                {books.map(book => (
                  <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    className='flex gap-3 hover:bg-gray-50 -mx-1.5 p-1.5 rounded-xl transition-colors'
                  >
                    <ImageWithFallback
                      src={book.coverUrl}
                      alt={book.title}
                      className='flex-shrink-0 rounded-lg w-10 h-14 object-cover'
                    />

                    <div className='flex-1 min-w-0'>
                      <p className='font-semibold text-gray-900 text-sm truncate'>{book.title}</p>
                      <p className='text-gray-500 text-xs'>{book.authorName}</p>

                      <div className='flex items-center gap-1 mt-1'>
                        <Star className='fill-yellow-400 w-3 h-3 text-yellow-400'/>

                        <span className='font-medium text-gray-600 text-xs'>{book.rating.toFixed(1)}</span>
                        <span className='text-gray-400 text-xs'>({book.ratingsCount.toLocaleString('pt-BR')})</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className='bg-white p-4 border border-gray-100 rounded-2xl'>
              <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                Gêneros
              </h3>

              <div className='flex flex-wrap gap-2'>
                {genres.map(genre => (
                  <Link
                    key={genre.id}
                    href={`/search?genre=${encodeURIComponent(genre.name)}`}
                    className='bg-gray-100 hover:bg-yellow-400 px-3 py-1.5 rounded-full font-medium text-gray-700 hover:text-black text-xs transition-colors'
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className='bg-black p-5 rounded-2xl text-white'>
              <h3 className='mb-2 font-bold text-lg'>Junte-se ao Booker</h3>

              <p className='mb-4 text-gray-400 text-sm'>
                Registre suas leituras, escreva resenhas e descubra seu próximo livro favorito.
              </p>

              <Link
                href='/login'
                className='block bg-yellow-400 hover:bg-yellow-300 py-2.5 rounded-full font-semibold text-black text-sm text-center transition-colors'
              >
                Criar conta gratuita
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Home;