'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Star, ThumbsUp, Pencil, Trash2, Loader2 } from 'lucide-react';

import getInitials from '@/utils/getInitials';
import type { ReviewSummary } from '@/types/Review';

interface ReviewCardProps extends ReviewSummary {
  canManage?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

function ReviewCard({
  headline,
  text,
  likeCount,
  user,
  score,
  updatedAt,
  canManage,
  onEdit,
  onDelete,
  isDeleting,
}: ReviewCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCountState, setLikeCount] = useState(likeCount ?? 0);
  const locale = useLocale();

  return (
    <div className='py-5 border-gray-100 last:border-0 border-b'>
      <div className='flex items-start gap-3'>
        <div className='flex flex-shrink-0 justify-center items-center bg-neutral-700 rounded-full w-9 h-9'>
          <span className='font-bold text-white text-xs'>{getInitials(user?.name || 'User')}</span>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-center'>
            <div>
              <span className='font-semibold text-gray-900 text-sm'>{user?.name}</span>
              {user?.username && (
                <span className='ml-1 text-gray-400 text-xs'>@{user.username}</span>
              )}
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-gray-400 text-xs'>
                {updatedAt
                  ? new Date(updatedAt).toLocaleDateString(locale, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
              </span>

              {canManage && (
                <div className='flex items-center gap-1 ml-2'>
                  {onEdit && (
                    <button
                      type='button'
                      onClick={onEdit}
                      className='p-1 text-gray-400 hover:text-yellow-600 transition-colors'
                      title='Editar avaliação'
                    >
                      <Pencil className='w-3.5 h-3.5' />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type='button'
                      onClick={onDelete}
                      disabled={isDeleting}
                      className='p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50'
                      title='Excluir avaliação'
                    >
                      {isDeleting ? (
                        <Loader2 className='w-3.5 h-3.5 animate-spin text-red-500' />
                      ) : (
                        <Trash2 className='w-3.5 h-3.5' />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className='flex items-center gap-2 mt-1'>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i <= score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>

            {headline && (
              <span className='font-medium text-gray-900 text-sm'>{headline}</span>
            )}
          </div>

          <p className='mt-2 text-gray-700 text-sm leading-relaxed whitespace-pre-line'>{text}</p>

          <div className='flex items-center gap-4 mt-3'>
            <button
              onClick={() => {
                setLiked((p) => !p);
                setLikeCount((p: number) => (liked ? p - 1 : p + 1));
              }}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                liked ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-blue-500' : ''}`} />
              <span>{likeCountState}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;