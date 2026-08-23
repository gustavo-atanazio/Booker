'use client';

import { useEffect, useState, useCallback, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Star,
  Heart,
  Plus,
  Check,
  BookOpen,
  Calendar,
  FileText,
  ChevronLeft,
  LogIn,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Pencil,
  Trash2,
} from 'lucide-react';

import BookCard from '@/components/BookCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import StarRating from './_components/StarRating';
import ReviewCard from './_components/ReviewCard';

import { useAuth } from '@/providers/AuthProvider';
import {
  createReviewAction,
  updateReviewAction,
  deleteReviewAction,
} from '@/actions/review.actions';
import {
  getBookByIdAction,
  getBookReviewsAction,
  getBooksAction,
} from '@/actions/book.actions';

import type Book from '@/types/Book';
import type { ReviewSummary } from '@/types/Review';
import type { BookSummary } from '@/types/Book';

function BookDetails() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const t = useTranslations('book');
  const tErrors = useTranslations('errors');
  const { user, isAdmin } = useAuth();

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

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<ReviewSummary[]>([]);
  const [favorited, setFavorited] = useState(false);
  const [added, setAdded] = useState(false);
  const [read, setRead] = useState(false);

  // Review Form state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHeadline, setReviewHeadline] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // Feedback states
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string | null>(null);
  const [reviewErrorMessage, setReviewErrorMessage] = useState<string | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [isSubmitting, startSubmitting] = useTransition();

  const [relatedBooks, setRelatedBooks] = useState<BookSummary[]>([]);

  const fetchBookData = useCallback(async () => {
    if (!id) return;
    const data = await getBookByIdAction(id);
    if (data) {
      setBook(data);
    }
  }, [id]);

  const fetchReviewsData = useCallback(async () => {
    if (!id) return;
    const data = await getBookReviewsAction(id);
    setReviews(data);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBookData();
      fetchReviewsData();
      getBooksAction().then(setRelatedBooks);
    }
  }, [id, fetchBookData, fetchReviewsData]);

  // Check if current authenticated user already has a review for this book
  const myReview = user
    ? reviews.find(
        (r) => r.user?.id === user.id || (user.username && r.user?.username === user.username)
      )
    : null;

  const handleStartEdit = (review: ReviewSummary) => {
    setIsEditing(true);
    setEditingReviewId(review.id);
    setReviewRating(review.score);
    setReviewHeadline(review.headline || '');
    setReviewText(review.text || '');
    setReviewErrorMessage(null);
    setReviewSuccessMessage(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingReviewId(null);
    setReviewRating(0);
    setReviewHeadline('');
    setReviewText('');
    setReviewErrorMessage(null);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0 || !reviewText.trim() || !book) return;

    setReviewErrorMessage(null);
    setReviewSuccessMessage(null);

    startSubmitting(async () => {
      if (isEditing && editingReviewId) {
        const result = await updateReviewAction(
          editingReviewId,
          {
            score: reviewRating,
            headline: reviewHeadline,
            text: reviewText.trim(),
          },
          book.id
        );

        if (result.success) {
          setReviewSuccessMessage(t('reviewUpdated'));
          setIsEditing(false);
          setEditingReviewId(null);
          setReviewHeadline('');
          setReviewText('');
          setReviewRating(0);
          fetchBookData();
          fetchReviewsData();
        } else {
          setReviewErrorMessage(result.error?.message || t('genericError'));
          setReviewErrorMessage(resolveErrorMessage(result.error));
        }
      } else {
        const result = await createReviewAction({
          bookID: book.id,
          score: reviewRating,
          headline: reviewHeadline,
          text: reviewText.trim(),
        });

        if (result.success) {
          setReviewSuccessMessage(t('reviewPublished'));
          setReviewHeadline('');
          setReviewText('');
          setReviewRating(0);
          fetchBookData();
          fetchReviewsData();
        } else {
          if (result.error?.code === 'DUPLICATE_REVIEW') {
            setReviewErrorMessage(t('duplicateReviewError'));
          } else {
            setReviewErrorMessage(result.error?.message || t('genericError'));
          }
          setReviewErrorMessage(resolveErrorMessage(result.error));
        }
      }
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!book) return;
    if (!window.confirm(t('deleteConfirm'))) return;

    setDeletingReviewId(reviewId);
    setReviewErrorMessage(null);
    setReviewSuccessMessage(null);

    startSubmitting(async () => {
      const result = await deleteReviewAction(reviewId, book.id);
      setDeletingReviewId(null);

      if (result.success) {
        setReviewSuccessMessage(t('reviewDeleted'));
        if (isEditing && editingReviewId === reviewId) {
          handleCancelEdit();
        }
        fetchBookData();
        fetchReviewsData();
      } else {
        setReviewErrorMessage(result.error?.message || t('genericError'));
        setReviewErrorMessage(resolveErrorMessage(result.error));
      }
    });
  };

  return book ? (
    <div className='pb-24 md:pb-8'>
      <section className='bg-black text-white'>
        <div className='mx-auto px-4 py-8 max-w-7xl'>
          <Link
            href='/'
            className='inline-flex items-center gap-1 mb-6 text-gray-400 hover:text-white text-sm transition-colors'
          >
            <ChevronLeft className='w-4 h-4' />
            {t('back')}
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
                onClick={() => setFavorited((p) => !p)}
                className='top-2 right-2 absolute flex justify-center items-center bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full w-8 h-8 transition-colors'
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorited ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
              </button>
            </div>

            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                {book.genres.map((genre) => (
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
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.round(book.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <span className='font-bold text-white'>{book.rating.toFixed(1)}</span>
                <span className='text-gray-500 text-sm'>
                  {t('ratingsCount', { count: book.ratingsCount })}
                </span>
              </div>

              <div className='flex flex-wrap gap-3'>
                <button
                  onClick={() => setAdded((p) => !p)}
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                    added
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {added ? <Check className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
                  {added ? t('added') : t('add')}
                </button>

                <button
                  onClick={() => setRead((p) => !p)}
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                    read
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {read ? <Check className='w-4 h-4' /> : <BookOpen className='w-4 h-4' />}
                  {read ? t('read') : t('markAsRead')}
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
              <h2 className='mb-3 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                {t('synopsis')}
              </h2>
              <p className='text-gray-700 text-sm leading-relaxed'>{book.synopsis}</p>
            </div>

            {/* Write / Edit / Existing Review Card */}
            <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
              <h2 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                {isEditing
                  ? t('editReview')
                  : myReview
                  ? t('yourReview')
                  : t('writeReview')}
              </h2>

              {reviewSuccessMessage && (
                <div className='flex items-center gap-2 bg-green-50 mb-4 p-3 border border-green-200 rounded-xl text-green-700 text-sm'>
                  <CheckCircle2 className='flex-shrink-0 w-4 h-4' />
                  <span>{reviewSuccessMessage}</span>
                </div>
              )}

              {reviewErrorMessage && (
                <div className='flex items-center gap-2 bg-red-50 mb-4 p-3 border border-red-200 rounded-xl text-red-600 text-sm'>
                  <AlertCircle className='flex-shrink-0 w-4 h-4' />
                  <span>{reviewErrorMessage}</span>
                </div>
              )}

              {!user ? (
                <div className='flex flex-col items-center gap-3 py-6 text-center'>
                  <LogIn className='w-8 h-8 text-gray-400' />
                  <p className='text-gray-600 text-sm'>{t('loginToReview')}</p>
                  <Link
                    href={`/login?redirect=/book/${book.id}`}
                    className='bg-black hover:bg-gray-800 px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-colors'
                  >
                    {t('loginButton')}
                  </Link>
                </div>
              ) : myReview && !isEditing ? (
                <div className='space-y-3'>
                  <div className='flex justify-between items-start'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <div className='flex'>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i <= myReview.score
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        {myReview.headline && (
                          <span className='font-semibold text-gray-900 text-sm'>
                            {myReview.headline}
                          </span>
                        )}
                      </div>
                      <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-line'>
                        {myReview.text}
                      </p>
                    </div>

                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => handleStartEdit(myReview)}
                        className='flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full font-semibold text-gray-600 hover:text-yellow-600 text-xs transition-colors'
                      >
                        <Pencil className='w-3.5 h-3.5' />
                        {t('editReview')}
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDeleteReview(myReview.id)}
                        disabled={deletingReviewId === myReview.id}
                        className='flex items-center gap-1 hover:bg-red-50 disabled:opacity-50 px-3 py-1.5 border border-red-200 rounded-full font-semibold text-red-500 hover:text-red-700 text-xs transition-colors'
                      >
                        {deletingReviewId === myReview.id ? (
                          <Loader2 className='w-3.5 h-3.5 animate-spin' />
                        ) : (
                          <Trash2 className='w-3.5 h-3.5' />
                        )}
                        {t('deleteReview')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  <div className='mb-4'>
                    <p className='mb-2 text-gray-500 text-xs'>{t('yourRating')}</p>
                    <StarRating value={reviewRating} onChange={setReviewRating} />
                  </div>

                  <div className='mb-3'>
                    <input
                      type='text'
                      value={reviewHeadline}
                      onChange={(e) => setReviewHeadline(e.target.value)}
                      placeholder={t('headlinePlaceholder')}
                      maxLength={50}
                      disabled={isSubmitting}
                      className='bg-gray-100 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-800 text-sm transition-all placeholder-gray-500'
                    />
                  </div>

                  <div>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder={t('reviewPlaceholder')}
                      rows={4}
                      required
                      maxLength={2048}
                      disabled={isSubmitting}
                      className='bg-gray-100 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-gray-700 text-sm transition-all resize-none placeholder-gray-500'
                    />
                  </div>

                  <div className='flex gap-2 mt-3'>
                    {isEditing && (
                      <button
                        type='button'
                        onClick={handleCancelEdit}
                        disabled={isSubmitting}
                        className='hover:bg-gray-100 px-5 py-2.5 border border-gray-300 rounded-full font-semibold text-gray-700 text-sm transition-colors'
                      >
                        {t('cancel')}
                      </button>
                    )}

                    <button
                      type='submit'
                      disabled={reviewRating === 0 || !reviewText.trim() || isSubmitting}
                      className='flex flex-1 justify-center items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-40 py-2.5 rounded-full font-semibold text-white text-sm transition-colors disabled:cursor-not-allowed'
                    >
                      {isSubmitting && <Loader2 className='w-4 h-4 animate-spin' />}
                      {isSubmitting
                        ? isEditing
                          ? t('updating')
                          : t('submitting')
                        : isEditing
                        ? t('updateReview')
                        : t('publishReview')}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Community Reviews List */}
            <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
              <h2 className='mb-1 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                {t('communityReviews')}
              </h2>

              <p className='mb-2 text-gray-400 text-xs'>
                {t('reviewsCount', { count: reviews.length })}
              </p>

              <div>
                {reviews.length === 0 ? (
                  <p className='py-6 text-gray-400 text-sm text-center'>
                    Nenhuma avaliação ainda. Seja o primeiro a avaliar!
                  </p>
                ) : (
                  reviews.map((review) => {
                    const canManage = user
                      ? review.user?.id === user.id ||
                        (user.username && review.user?.username === user.username) ||
                        isAdmin
                      : false;

                    return (
                      <ReviewCard
                        key={review.id}
                        {...review}
                        canManage={canManage}
                        onEdit={() => handleStartEdit(review)}
                        onDelete={() => handleDeleteReview(review.id)}
                        isDeleting={deletingReviewId === review.id}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <aside className='flex flex-col flex-shrink-0 gap-6 lg:w-72'>
            <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
              <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                {t('details')}
              </h3>

              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3 text-sm'>
                  <Calendar className='flex-shrink-0 w-4 h-4 text-gray-400' />
                  <span className='text-gray-500'>{t('publishedIn')}</span>
                  <span className='ml-auto font-medium text-gray-900'>{book.releaseYear}</span>
                </div>

                <div className='flex items-center gap-3 text-sm'>
                  <FileText className='flex-shrink-0 w-4 h-4 text-gray-400' />
                  <span className='text-gray-500'>{t('pages')}</span>
                  <span className='ml-auto font-medium text-gray-900'>{book.pageCount}</span>
                </div>

                <div className='flex flex-col gap-3 text-sm'>
                  <div className='flex flex-grow items-center gap-3'>
                    <BookOpen className='flex-shrink-0 w-4 h-4 text-gray-400' />
                    <span className='text-gray-500'>{t('genres')}</span>
                  </div>

                  {book.genres.map((genre) => (
                    <span className='ml-4 font-medium text-gray-900' key={genre.id}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {relatedBooks.length > 0 && (
              <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
                <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                  {t('relatedBooks')}
                </h3>

                <div className='flex flex-col gap-4'>
                  {relatedBooks.slice(0, 4).map((b) => (
                    <Link
                      key={b.id}
                      href={`/book/${b.id}`}
                      className='flex gap-3 hover:bg-gray-50 -mx-1.5 p-1.5 rounded-xl transition-colors'
                    >
                      <ImageWithFallback
                        src={b.coverUrl}
                        alt={b.title}
                        className='flex-shrink-0 rounded-lg w-10 h-14 object-cover'
                      />

                      <div className='flex-1 min-w-0'>
                        <p className='font-semibold text-gray-900 text-sm truncate'>{b.title}</p>
                        <p className='text-gray-500 text-xs'>{b.authorName}</p>

                        <div className='flex items-center gap-1 mt-1'>
                          <Star className='fill-yellow-400 w-3 h-3 text-yellow-400' />
                          <span className='font-medium text-gray-600 text-xs'>
                            {b.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className='bg-white p-5 border border-gray-100 rounded-2xl'>
              <h3 className='mb-4 font-bold text-gray-900 text-xs uppercase tracking-widest'>
                {t('youMightAlsoLike')}
              </h3>

              <div className='gap-3 grid grid-cols-2'>
                {relatedBooks
                  .filter((b) => b.id !== book.id)
                  .slice(0, 4)
                  .map((b) => (
                    <BookCard key={b.id} book={b} />
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col justify-center items-center gap-4 min-h-screen text-gray-500'>
      <BookOpen className='w-12 h-12 text-gray-300' />
      <p>{t('notFound')}</p>
      <Link href='/' className='font-semibold text-yellow-500 hover:underline'>
        {t('backHome')}
      </Link>
    </div>
  );
}

export default BookDetails;