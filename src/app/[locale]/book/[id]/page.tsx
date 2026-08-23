'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, Heart, Plus, Check, BookOpen, Calendar, FileText, /* Building2, Hash, */ ChevronLeft } from 'lucide-react';

import BookCard from '@/components/BookCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import StarRating from './_components/StarRating';
import ReviewCard from './_components/ReviewCard';

import { apiGet, loadData } from '@/services/api';

import { PUBLIC_ENDPOINT, BOOKS_ENPOINT } from '@/constants/api';

import type Book from '@/types/Book';
import type { ReviewSummary } from '@/types/Review';
import type { BookSummary } from '@/types/Book';

function BookDetails() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<ReviewSummary[]>([]);
  const [favorited, setFavorited] = useState(false);
  const [added, setAdded] = useState(false);
  const [read, setRead] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState<BookSummary[]>([]);

  const handleSubmitReview = () => {
    if (reviewRating === 0) return;

    setSubmitted(true);
    setReviewText('');
    setReviewRating(0);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await apiGet<Book>(`${PUBLIC_ENDPOINT + BOOKS_ENPOINT}/${id}`);

      if (data) {
        console.log(data);
        setBook(data);
      }
    }

    if (id) {
      fetchData();
      loadData<ReviewSummary>(`${PUBLIC_ENDPOINT + BOOKS_ENPOINT}/${id}/reviews`, setReviews);
      loadData<BookSummary>(PUBLIC_ENDPOINT + BOOKS_ENPOINT, setRelatedBooks);
    }
  }, [id]);

  return book
    ? (
      <div className='pb-24 md:pb-8'>
        <section className='bg-black text-white'>
          <div className='mx-auto px-4 py-8 max-w-7xl'>
            <Link href='/' className='inline-flex items-center gap-1 mb-6 text-gray-400 hover:text-white text-sm transition-colors'>
              <ChevronLeft className='w-4 h-4'/>
              Voltar
            </Link>

            <div className='flex items-start gap-6 md:gap-10'>
              <div className='relative flex-shrink-0'>
                <ImageWithFallback
                  src={book.coverUrl}
                  alt={book.title}
                  className='shadow-2xl rounded-xl w-28 md:w-44 object-cover'
                  style={{ aspectRatio: '2/3' }}
                />

                <button
                  onClick={() => setFavorited(p => !p)}
                  className='top-2 right-2 absolute flex justify-center items-center bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full w-8 h-8 transition-colors'
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : 'text-white'}`}/>
                </button>
              </div>

              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  {book.genres.map(genre => (
                    <span
                      className='inline-block bg-yellow-400 mb-3 px-3 py-1 rounded-full font-semibold text-black text-xs'
                      key={genre.id}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h1 className='mb-1 font-bold text-2xl md:text-4xl'>{book.title}</h1>
                <p className='mb-3 text-gray-400 text-base md:text-lg'>{book.author.name}</p>

                <div className='flex items-center gap-3 mb-5'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= Math.round(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>

                  <span className='font-bold text-white'>{book.rating.toFixed(1)}</span>
                  <span className='text-gray-500 text-sm'>
                    ({book.ratingsCount.toLocaleString('pt-BR')} {book.ratingsCount > 1 ? 'avaliações' : 'avaliação'})
                  </span>
                </div>

                <div className='flex flex-wrap gap-3'>
                  <button
                    onClick={() => setAdded(p => !p)}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                      added ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {added ? <Check className='w-4 h-4'/> : <Plus className='w-4 h-4'/>}
                    {added ? 'Adicionado' : 'Adicionar'}
                  </button>

                  <button
                    onClick={() => setRead(p => !p)}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                      read ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {read ? <Check className='w-4 h-4'/> : <BookOpen className='w-4 h-4'/>}
                    {read ? 'Lido!' : 'Marcar como Lido'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='mx-auto px-4 py-8 max-w-7xl'>
          <div className='flex lg:flex-row flex-col gap-8'>
            <div className='flex flex-col flex-1 gap-6 min-w-0'>
              <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
                <h2 className='mb-3 font-bold text-gray-900 text-xs uppercase tracking-widest'>Sinopse</h2>
                <p className='text-gray-700 text-sm leading-relaxed'>{book.synopsis}</p>
              </div>

              <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
                <h2 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>Escreva sua Resenha</h2>

                {submitted ? (
                  <div className='py-4 text-center'>
                    <div className='mb-1 font-semibold text-green-500'>Resenha publicada!</div>
                    <button onClick={() => setSubmitted(false)} className='text-yellow-500 text-sm hover:underline'>Escrever outra</button>
                  </div>
                ) : (
                  <>
                    <div className='mb-4'>
                      <p className='mb-2 text-gray-500 text-xs'>Sua nota</p>
                      <StarRating value={reviewRating} onChange={setReviewRating}/>
                    </div>

                    <textarea
                      value={reviewText}
                      onChange={e => setReviewText(e.target.value)}
                      placeholder='O que você achou deste livro?'
                      rows={4}
                      className='bg-gray-100 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-700 text-sm transition-all resize-none placeholder-gray-600'
                    />

                    <button
                      onClick={handleSubmitReview}
                      disabled={reviewRating === 0}
                      className='bg-black hover:bg-gray-800 disabled:opacity-40 mt-3 py-2.5 rounded-full w-full font-semibold text-white text-sm transition-colors disabled:cursor-not-allowed'
                    >
                      Publicar resenha
                    </button>
                  </>
                )}
              </div>

              <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
                <h2 className='mb-1 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                  Resenhas da Comunidade
                </h2>

                <p className='mb-2 text-gray-400 text-xs'>{reviews.length} resenhas</p>

                <div>
                  {reviews.map(review => <ReviewCard key={review.id} {...review}/>)}
                </div>
              </div>
            </div>

            <aside className='flex flex-col flex-shrink-0 gap-6 lg:w-72'>
              <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
                <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>Detalhes</h3>

                <div className='flex flex-col gap-3'>
                  <div className='flex items-center gap-3 text-sm'>
                    <Calendar className='flex-shrink-0 w-4 h-4 text-gray-400'/>

                    <span className='text-gray-500'>Publicado em</span>
                    <span className='ml-auto font-medium text-gray-900'>{book.releaseYear}</span>
                  </div>

                  <div className='flex items-center gap-3 text-sm'>
                    <FileText className='flex-shrink-0 w-4 h-4 text-gray-400'/>

                    <span className='text-gray-500'>Páginas</span>
                    <span className='ml-auto font-medium text-gray-900'>{book.pageCount}</span>
                  </div>

                  <div className='flex flex-col gap-3 text-sm'>
                    <div className='flex flex-grow items-center gap-3'>
                      <BookOpen className='flex-shrink-0 w-4 h-4 text-gray-400'/>

                      <span className='text-gray-500'>Gêneros</span>
                    </div>

                    {book.genres.map(genre => (
                      <span
                        className='ml-4 font-medium text-gray-900'
                        key={genre.id}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  {/* <div className='flex items-center gap-3 text-sm'>
                    <Building2 className='flex-shrink-0 w-4 h-4 text-gray-400'/>

                    <span className='text-gray-500'>Editora</span>
                    <span className='ml-auto font-medium text-gray-900'>{book.publisher}</span>
                  </div> */}

                  {/* <div className='flex items-center gap-3 text-sm'>
                    <Hash className='flex-shrink-0 w-4 h-4 text-gray-400'/>

                    <span className='text-gray-500'>ISBN</span>
                    <span className='ml-auto font-medium text-gray-900 text-xs'>{book.isbn}</span>
                  </div> */}
                </div>
              </div>

              {relatedBooks.length > 0 && (
                <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
                  <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>Livros Relacionados</h3>

                  <div className='flex flex-col gap-4'>
                    {relatedBooks.map(b => (
                      <Link
                        key={b.id}
                        href={`/book/${b.id}`}
                        className='flex gap-3 hover:bg-gray-50 -mx-1.5 p-1.5 rounded-xl transition-colors'
                      >
                        <ImageWithFallback src={b.coverUrl} alt={b.title} className='flex-shrink-0 rounded-lg w-10 h-14 object-cover'/>

                        <div className='flex-1 min-w-0'>
                          <p className='font-semibold text-gray-900 text-sm truncate'>{b.title}</p>
                          <p className='text-gray-500 text-xs'>{b.authorName}</p>

                          <div className='flex items-center gap-1 mt-1'>
                            <Star className='fill-yellow-400 w-3 h-3 text-yellow-400'/>

                            <span className='font-medium text-gray-600 text-xs'>{b.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
                <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>Você também pode gostar</h3>

                <div className='gap-3 grid grid-cols-2'>
                  {relatedBooks.filter(b => b.id !== book.id).slice(0, 4).map(b => <BookCard key={b.id} book={b}/>)}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    )
    : (
      <div className='flex flex-col justify-center items-center gap-4 min-h-screen text-gray-500'>
        <BookOpen className='w-12 h-12 text-gray-300'/>

        <p>Livro não encontrado.</p>

        <Link href='/' className='font-semibold text-yellow-500 hover:underline'>
          Voltar ao início
        </Link>
      </div>
    )
  ;
}

export default BookDetails;