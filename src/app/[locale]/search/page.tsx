'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search as SearchIcon, X, ChevronRight, Star, SlidersHorizontal } from 'lucide-react';

import BookCard from '@/components/BookCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import Pill from './_components/Pill';

import { getBooksAction } from '@/actions/book.actions';
import { getGenresAction } from '@/actions/genre.actions';

import getGradient from '@/utils/getGradient';

import type Genre from '@/types/Genre';
import type { BookSummary } from '@/types/Book';

const pubYearKeys = [
  { key: 'all', labelKey: 'allYears', raw: '' },
  { key: '2020–2026', labelKey: '', raw: '2020–2026' },
  { key: '2010–2019', labelKey: '', raw: '2010–2019' },
  { key: '2000–2009', labelKey: '', raw: '2000–2009' },
  { key: '1950–1999', labelKey: '', raw: '1950–1999' },
  { key: 'before1950', labelKey: 'before1950', raw: '' }
] as const;

const ratingKeys = [
  { key: 'all', labelKey: 'allRatings', raw: '' },
  { key: '3.0', labelKey: '', raw: '3.0+' },
  { key: '3.5', labelKey: '', raw: '3.5+' },
  { key: '4.0', labelKey: '', raw: '4.0+' },
  { key: '4.5', labelKey: '', raw: '4.5+' }
] as const;

const sortKeys = [
  { key: 'relevance', labelKey: 'relevance' },
  { key: 'highestRating', labelKey: 'highestRating' },
  { key: 'lowestRating', labelKey: 'lowestRating' },
  { key: 'newest', labelKey: 'newest' },
  { key: 'oldest', labelKey: 'oldest' },
  { key: 'az', labelKey: 'az' },
  { key: 'za', labelKey: 'za' }
] as const;

function SearchContent() {
  const searchParams = useSearchParams();
  const t = useTranslations('search');

  const [books, setBooks] = useState<BookSummary[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [pub, setPub] = useState('all');
  const [rating, setRating] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const genre = searchParams.get('genre');
    if (genre) setSelectedGenre(genre);
  }, [searchParams]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
      }
    }

    getGenresAction().then(setGenres);
    getBooksAction().then(setBooks);

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const hasActiveFilters =
    selectedGenre !== 'all' || pub !== 'all' || rating !== 'all' || sort !== 'relevance';
  const isSearching =
    query.trim().length > 0 || selectedGenre !== 'all' || pub !== 'all' || rating !== 'all';

  function applyYear(b: BookSummary, yearKey: string) {
    const y = b.releaseYear;
    switch (yearKey) {
      case '2020–2026': return y >= 2020;
      case '2010–2019': return y >= 2010 && y < 2020;
      case '2000–2009': return y >= 2000 && y < 2010;
      case '1950–1999': return y >= 1950 && y < 2000;
      case 'before1950': return y < 1950;
      default: return true;
    }
  }

  function applyRating(b: BookSummary, r: string) {
    if (r === 'all') return true;
    return b.rating >= parseFloat(r);
  }

  function applySort(arr: BookSummary[], s: string) {
    const copy = [...arr];
    switch (s) {
      case 'highestRating': return copy.sort((a, b) => b.rating - a.rating);
      case 'lowestRating': return copy.sort((a, b) => a.rating - b.rating);
      case 'newest': return copy.sort((a, b) => b.releaseYear - a.releaseYear);
      case 'oldest': return copy.sort((a, b) => a.releaseYear - b.releaseYear);
      case 'az': return copy.sort((a, b) => a.title.localeCompare(b.title));
      case 'za': return copy.sort((a, b) => b.title.localeCompare(a.title));
      default: return copy;
    }
  }

  function clearAll() {
    setQuery('');
    setSelectedGenre('all');
    setPub('all');
    setRating('all');
    setSort('relevance');
  }

  let results = [...books];

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      b => b.title.toLowerCase().includes(q) || b.authorName.toLowerCase().includes(q)
    );
  }

  if (selectedGenre !== 'all') {
    results = results.filter(b => b.genres && b.genres.includes(selectedGenre));
  }

  results = results.filter(b => applyYear(b, pub));
  results = results.filter(b => applyRating(b, rating));
  results = applySort(results, sort);

  const activeCount = [
    selectedGenre !== 'all',
    pub !== 'all',
    rating !== 'all',
    sort !== 'relevance'
  ].filter(Boolean).length;

  return (
    <div className='bg-[#F5F5F5] pb-24 min-h-screen'>
      <div ref={headerRef} className='top-0 z-30 sticky bg-black px-4 pt-5 pb-4'>
        <div className='mx-auto max-w-xl max-xl'>
          <div className='relative flex gap-2' ref={filterRef}>
            <div className='relative flex-1'>
              <SearchIcon className='top-1/2 left-4 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none' />

              <input
                type='text'
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t('placeholder')}
                className='bg-white py-3 pr-10 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-900 text-sm transition-all placeholder-gray-400'
              />

              {query && (
                <button
                  onClick={() => setQuery('')}
                  className='top-1/2 right-3.5 absolute text-gray-400 hover:text-gray-700 transition-colors -translate-y-1/2'
                  aria-label={t('clearSearch')}
                >
                  <X className='w-4 h-4' />
                </button>
              )}
            </div>

            <div className='relative flex-shrink-0'>
              <button
                onClick={() => setFiltersOpen(v => !v)}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-colors h-full ${filtersOpen || hasActiveFilters
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <SlidersHorizontal className='w-4 h-4' />
                {t('filters')}

                {hasActiveFilters && !filtersOpen && (
                  <span className='-top-1 -right-1 absolute bg-yellow-400 border-2 border-black rounded-full w-3 h-3' />
                )}
              </button>

              {filtersOpen && (
                <div
                  onClick={e => e.stopPropagation()}
                  className='top-[calc(100%+8px)] right-0 z-50 absolute flex flex-col gap-4 bg-white shadow-2xl p-4 border border-gray-100 rounded-2xl w-[min(92vw,420px)]'
                  style={{ maxHeight: '80vh', overflowY: 'auto' }}
                >
                  <div>
                    <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
                      {t('genre')}
                    </p>

                    <div className='flex flex-wrap gap-1.5'>
                      <Pill active={selectedGenre === 'all'} onClick={() => setSelectedGenre('all')}>
                        {t('all')}
                      </Pill>
                      {genres.map(g => (
                        <Pill key={g.id} active={selectedGenre === g.name} onClick={() => setSelectedGenre(g.name)}>
                          {g.name}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  <div className='border-gray-100 border-t' />

                  <div>
                    <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
                      {t('publication')}
                    </p>
                    <div className='flex flex-wrap gap-1.5'>
                      {pubYearKeys.map(({ key, labelKey, raw }) => (
                        <Pill key={key} active={pub === key} onClick={() => setPub(key)}>
                          {labelKey ? t(labelKey) : raw}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  <div className='border-gray-100 border-t' />

                  <div>
                    <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
                      {t('minRating')}
                    </p>

                    <div className='flex flex-wrap gap-1.5'>
                      {ratingKeys.map(({ key, labelKey, raw }) => (
                        <Pill key={key} active={rating === key} onClick={() => setRating(key)}>
                          {labelKey ? (
                            t(labelKey)
                          ) : (
                            <span className='flex items-center gap-1'>
                              <Star className='fill-current w-3 h-3' />{raw}
                            </span>
                          )}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  <div className='border-gray-100 border-t' />

                  <div>
                    <p className='mb-2 font-semibold text-[10px] text-gray-400 uppercase tracking-widest'>
                      {t('sort')}
                    </p>

                    <div className='flex flex-wrap gap-1.5'>
                      {sortKeys.map(({ key, labelKey }) => (
                        <Pill key={key} active={sort === key} onClick={() => setSort(key)}>
                          {t(`sortOptions.${labelKey}`)}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <div className='flex justify-between items-center pt-3 border-gray-100 border-t'>
                      <span className='text-gray-400 text-xs'>
                        {t('activeFilters', { count: activeCount })}
                      </span>

                      <button
                        onClick={() => {
                          clearAll();
                          setFiltersOpen(false);
                        }}
                        className='font-semibold text-red-400 hover:text-red-600 text-xs transition-colors'
                      >
                        {t('clearAll')}
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
                <span className='font-semibold text-gray-900'>
                  {t('resultsCount', { count: results.length })}
                </span>
                {selectedGenre !== 'all' && (
                  <span> {t('inGenre', { genre: selectedGenre })}</span>
                )}
              </p>

              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className='font-semibold text-yellow-500 hover:text-yellow-600 text-xs transition-colors'
                >
                  {t('clearFilters')}
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
                      <div className='flex items-center gap-0.5 ml-auto'>
                        <Star className='fill-yellow-400 w-3 h-3 text-yellow-400' />
                        <span className='font-semibold text-gray-700 text-xs'>{book.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className='flex-shrink-0 self-center w-4 h-4 text-gray-300' />
                </Link>
              ))}

              {results.length === 0 && (
                <div className='py-20 text-center'>
                  <div className='mb-4 text-5xl'>📚</div>
                  <h3 className='mb-1 font-semibold text-gray-900 text-base'>{t('noResults')}</h3>
                  <p className='text-gray-500 text-sm'>{t('noResultsDescription')}</p>

                  <button
                    onClick={clearAll}
                    className='mt-5 font-semibold text-yellow-500 hover:text-yellow-600 text-sm transition-colors'
                  >
                    {t('clearSearch')}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <section className='pt-6 pb-2'>
              <div className='flex justify-between items-center mb-3'>
                <h2 className='font-bold text-gray-900 text-xs uppercase tracking-widest'>{t('trending')}</h2>
                <span className='font-semibold text-yellow-500 text-xs'>{t('thisWeek')}</span>
              </div>

              <div className='flex gap-3 -mx-4 px-4 overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
                {books.map(book => (
                  <div key={book.id} className='flex-shrink-0 w-[100px]'>
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            </section>

            <section className='pt-6 pb-8'>
              <h2 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                {t('exploreByGenre')}
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
                          {t('booksCount', { count })}
                        </span>
                      )}

                      <ChevronRight className='top-1/2 right-3 absolute w-4 h-4 text-white/30 -translate-y-1/2' />
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}