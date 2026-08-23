'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, X, ChevronRight, Star, SlidersHorizontal } from 'lucide-react';

import BookCard from '@/components/BookCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import Pill from './_components/Pill';

import { loadData } from '@/services/api';

import getGradient from '@/utils/getGradient';

import { PUBLIC_ENDPOINT, BOOKS_ENPOINT, GENRES_ENDPOINT } from '@/constants/api';

import type Genre from '@/types/Genre';
import type Book from '@/types/Book';
import type { BookSummary } from '@/types/Book';

const pubYears = ['Todos os anos', '2020–2026', '2010–2019', '2000–2009', '1950–1999', 'Antes de 1950'];
const ratings = ['Todas', '3.0+', '3.5+', '4.0+', '4.5+'];
const sortOptions = ['Relevância', 'Maior Nota', 'Menor Nota', 'Mais Recente', 'Mais Antigo', 'A – Z', 'Z – A'];

function Search() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [pub, setPub] = useState('Todos os anos');
  const [rating, setRating] = useState('Todas');
  const [sort, setSort] = useState('Relevância');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const allGenres = ['Todos', ...genres.map(g => g.name)];

  useEffect(() => {
    const genre = searchParams.get('genre');

    if (genre) setSelectedGenre(genre);
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFiltersOpen(false);
    }

    loadData<Genre>(PUBLIC_ENDPOINT + GENRES_ENDPOINT, setGenres);
    loadData<BookSummary>(PUBLIC_ENDPOINT + BOOKS_ENPOINT, setBooks);

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const hasActiveFilters = selectedGenre !== 'Todos' || pub !== 'Todos os anos' || rating !== 'Todas' || sort !== 'Relevância';
  const isSearching = query.trim().length > 0 || selectedGenre !== 'Todos' || pub !== 'Todos os anos' || rating !== 'Todas';

  let results = [...books];

  if (query.trim()) {
    const q = query.toLowerCase();

    results = results.filter(b => b.title.toLowerCase().includes(q) || (b.authorName || '').toLowerCase().includes(q));
  }

  if (selectedGenre !== 'Todos') results = results.filter(b => b.genres && b.genres.includes(selectedGenre));

  results = results.filter(b => applyYear(b, pub));
  results = results.filter(b => applyRating(b, rating));
  results = applySort(results, sort);

  function applyYear(b: BookSummary, pub: string) {
    const y = b.releaseYear;

    switch (pub) {
      case '2020–2026': return y >= 2020;
      case '2010–2019': return y >= 2010 && y < 2020;
      case '2000–2009': return y >= 2000 && y < 2010;
      case '1950–1999': return y >= 1950 && y < 2000;
      case 'Antes de 1950': return y < 1950;
      default: return true;
    }
  }

  function applyRating(b: BookSummary, r: string) {
    if (r === 'Todas') return true;

    return b.rating >= parseFloat(r);
  }

  function applySort(arr: BookSummary[], s: string) {
    const copy = [...arr];

    switch (s) {
      case 'Maior Nota': return copy.sort((a, b) => b.rating - a.rating);
      case 'Menor Nota': return copy.sort((a, b) => a.rating - b.rating);
      case 'Mais Recente': return copy.sort((a, b) => b.releaseYear - a.releaseYear);
      case 'Mais Antigo': return copy.sort((a, b) => a.releaseYear - b.releaseYear);
      case 'A – Z': return copy.sort((a, b) => a.title.localeCompare(b.title));
      case 'Z – A': return copy.sort((a, b) => b.title.localeCompare(a.title));
      default: return copy;
    }
  }

  function clearAll() {
    setQuery('');
    setSelectedGenre('Todos');
    setPub('Todos os anos');
    setRating('Todas');
    setSort('Relevância');
  }

  const activeCount = [
    selectedGenre !== 'Todos',
    pub !== 'Todos os anos',
    rating !== 'Todas',
    sort !== 'Relevância'
  ].filter(Boolean).length;

  return (
    <Suspense>
      <div className='bg-[#F5F5F5] pb-24 min-h-screen'>
        <div ref={headerRef} className='top-0 z-30 sticky bg-black px-4 pt-5 pb-4'>
          <div className='mx-auto max-w-xl'>
            <div className='relative flex gap-2' ref={filterRef}>
              <div className='relative flex-1'>
                <SearchIcon className='top-1/2 left-4 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none'/>

                <input
                  type='text'
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder='Buscar por título ou autor...'
                  className='bg-white py-3 pr-10 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
                />

                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className='top-1/2 right-3.5 absolute text-gray-400 hover:text-gray-700 transition-colors -translate-y-1/2'
                  >
                    <X className='w-4 h-4'/>
                  </button>
                )}
              </div>

              <div className='relative flex-shrink-0'>
                <button
                  onClick={() => setFiltersOpen(v => !v)}
                  className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-colors h-full ${
                    filtersOpen || hasActiveFilters
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <SlidersHorizontal className='w-4 h-4'/>

                  Filtros

                  {hasActiveFilters && !filtersOpen && (
                    <span className='-top-1 -right-1 absolute bg-yellow-400 border-2 border-black rounded-full w-3 h-3'/>
                  )}
                </button>

                {filtersOpen && (
                  <div
                    onClick={e => e.stopPropagation()}
                    className='top-[calc(100%+8px)] right-0 z-50 absolute flex flex-col gap-4 bg-white shadow-2xl p-4 border border-gray-100 rounded-2xl w-[min(92vw,420px)]'
                    style={{ maxHeight: '80vh', overflowY: 'auto' }}
                  >
                    <div>
                      <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Gênero</p>

                      <div className='flex flex-wrap gap-1.5'>
                        {allGenres.map(g => (
                          <Pill key={g} active={selectedGenre === g} onClick={() => setSelectedGenre(g)}>
                            {g}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    <div className='border-gray-100 border-t'/>

                    <div>
                      <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Publicação</p>
                      <div className='flex flex-wrap gap-1.5'>
                        {pubYears.map(y => (
                          <Pill key={y} active={pub === y} onClick={() => setPub(y)}>{y}</Pill>
                        ))}
                      </div>
                    </div>

                    <div className='border-gray-100 border-t'/>

                    <div>
                      <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
                        Avaliação mínima
                      </p>

                      <div className='flex flex-wrap gap-1.5'>
                        {ratings.map(r => (
                          <Pill key={r} active={rating === r} onClick={() => setRating(r)}>
                            {r === 'Todas' ? 'Todas' : (
                              <span className='flex items-center gap-1'>
                                <Star className='fill-current w-3 h-3'/>{r}
                              </span>
                            )}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    <div className='border-gray-100 border-t'/>

                    <div>
                      <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>Ordenar</p>

                      <div className='flex flex-wrap gap-1.5'>
                        {sortOptions.map(s => (
                          <Pill key={s} active={sort === s} onClick={() => setSort(s)}>{s}</Pill>
                        ))}
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <div className='flex justify-between items-center pt-3 border-gray-100 border-t'>
                        <span className='text-gray-400 text-xs'>{activeCount} filtro{activeCount !== 1 ? 's' : ''} ativo{activeCount !== 1 ? 's' : ''}</span>

                        <button
                          onClick={() => {
                            clearAll();
                            setFiltersOpen(false);
                          }}
                          className='font-semibold text-red-400 hover:text-red-600 text-xs transition-colors'
                        >
                          Limpar tudo
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto px-4 max-w-xl'>
          {isSearching ? (
            <div className='pt-5'>
              <div className='flex justify-between items-center mb-4'>
                <p className='text-gray-500 text-xs'>
                  <span className='font-semibold text-gray-900'>{results.length}</span>{' '}

                  resultado{results.length !== 1 ? 's' : ''}

                  {selectedGenre !== 'Todos' && (
                    <span> em <span className='font-semibold text-yellow-600'>{selectedGenre}</span></span>
                  )}
                </p>

                {hasActiveFilters && (
                  <button onClick={clearAll} className='font-semibold text-yellow-500 hover:text-yellow-600 text-xs transition-colors'>
                    Limpar filtros
                  </button>
                )}
              </div>

              <div className='flex flex-col gap-1'>
                {results.map(book => (
                  <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    className='flex gap-3 bg-white hover:bg-yellow-50 p-3 rounded-2xl transition-colors'
                  >
                    <ImageWithFallback
                      src={book.coverUrl}
                      alt={book.title}
                      className='flex-shrink-0 rounded-xl w-11 h-16 object-cover'
                    />

                    <div className='flex flex-col flex-1 justify-center min-w-0'>
                      <p className='font-semibold text-gray-900 text-sm truncate'>{book.title}</p>
                      <p className='mt-0.5 text-gray-500 text-xs'>{book.authorName}</p>

                      <div className='flex items-center gap-2 mt-2'>
                        {/* <span className='bg-gray-100 px-2 py-0.5 rounded-full max-w-[120px] text-[11px] text-gray-500 truncate'>
                          {book.genre}
                        </span> */}

                        <div className='flex items-center gap-0.5 ml-auto'>
                          <Star className='fill-yellow-400 w-3 h-3 text-yellow-400'/>
                          <span className='font-semibold text-gray-700 text-xs'>{book.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className='flex-shrink-0 self-center w-4 h-4 text-gray-300'/>
                  </Link>
                ))}

                {results.length === 0 && (
                  <div className='py-20 text-center'>
                    <div className='mb-4 text-5xl'>📚</div>
                    <h3 className='mb-1 font-semibold text-gray-900 text-base'>Nenhum resultado</h3>
                    <p className='text-gray-500 text-sm'>Tente outro título, autor ou ajuste os filtros.</p>

                    <button
                      onClick={clearAll}
                      className='mt-5 font-semibold text-yellow-500 hover:text-yellow-600 text-sm transition-colors'
                    >
                      Limpar busca
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <section className='pt-6 pb-2'>
                <div className='flex justify-between items-center mb-3'>
                  <h2 className='font-bold text-gray-900 text-xs uppercase tracking-widest'>Em Alta</h2>
                  <span className='font-semibold text-yellow-500 text-xs'>Esta semana</span>
                </div>

                <div className='flex gap-3 -mx-4 px-4 overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
                  {books.map(book => (
                    <div key={book.id} className='flex-shrink-0 w-[100px]'>
                      <BookCard book={book}/>
                    </div>
                  ))}
                </div>
              </section>

              <section className='pt-6 pb-8'>
                <h2 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                  Explorar por Gênero
                </h2>

                <div className='gap-3 grid grid-cols-2'>
                  {genres.map(genre => {
                    const count = books.filter(b => b.genres && b.genres.includes(genre.name)).length;

                    return (
                      <button
                        key={genre.id}
                        onClick={() => {
                          setSelectedGenre(genre.name);
                          setFiltersOpen(false);
                        }}
                        className={`bg-gradient-to-br ${getGradient(genre.id)} rounded-2xl p-4 text-left relative overflow-hidden active:scale-95 transition-transform`}
                      >
                        <span className='block font-semibold text-white text-sm leading-snug'>
                          {genre.name}
                        </span>

                        {count > 0 && (
                          <span className='block mt-1 text-[11px] text-white/50'>
                            {count} livro{count !== 1 ? 's' : ''}
                          </span>
                        )}

                        <ChevronRight className='top-1/2 right-3 absolute w-4 h-4 text-white/30 -translate-y-1/2'/>
                      </button>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default Search;