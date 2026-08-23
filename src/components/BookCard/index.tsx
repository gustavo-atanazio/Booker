import { Link } from '@/i18n/routing';
import { Star } from 'lucide-react';

import ImageWithFallback from '@/components/ImageWithFallback';

import type { BookSummary } from '@/types/Book';

interface BookCardProps {
  book: BookSummary;
  showBadge?: boolean;
}

function BookCard({ book, showBadge = false }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className='group block'>
      <div className='relative rounded-lg overflow-hidden' style={{ aspectRatio: '2/3' }}>
        <ImageWithFallback
          src={book.coverUrl}
          alt={book.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />

        <div className='absolute inset-0 flex justify-center items-center bg-black/0 group-hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <div className='flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full text-black'>
            <Star className='fill-black w-3 h-3' />

            <span className='font-bold text-xs'>{book.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[inset_0_-40px_40px_rgba(0,0,0,0.4)] rounded-lg transition-opacity duration-300' />

        {showBadge && (
          <div className='top-1.5 right-1.5 absolute bg-yellow-400 p-0.5 rounded-full'>
            <Star className='fill-black w-3 h-3 text-black' />
          </div>
        )}
      </div>

      <div className='mt-2'>
        <p className='font-medium text-gray-900 text-sm truncate leading-snug'>{book.title}</p>
        <p className='text-gray-500 text-xs truncate'>{book.authorName}</p>
        <p className='text-gray-400 text-xs'>{book.releaseYear}</p>
      </div>
    </Link>
  );
}

export default BookCard;