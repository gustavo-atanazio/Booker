import { useState } from 'react';
import { MessageSquare, Star, ThumbsUp } from 'lucide-react';

import getInitials from '@/utils/getInitials';

import type { ReviewSummary } from '@/types/Review';

function ReviewCard({ text, likeCount, user, score, updatedAt }: ReviewSummary) {
  const [liked, setLiked] = useState(false);
  const [likeCountState, setLikeCount] = useState(likeCount);

  return (
    <div className='py-5 border-gray-100 last:border-0 border-b'>
      <div className='flex items-start gap-3'>
        <div className='flex flex-shrink-0 justify-center items-center bg-neutral-700 rounded-full w-9 h-9'>
          <span className='font-bold text-white text-xs'>{getInitials(user.name)}</span>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-center'>
            <div>
              <span className='font-semibold text-gray-900 text-sm'>{user.name}</span>
              <span className='ml-1 text-gray-400 text-xs'>@{user.username}</span>
            </div>

            <span className='text-gray-400 text-xs'>
              {new Date(updatedAt).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          <div className='flex mt-1'>
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-3.5 h-3.5 ${i <= score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
            ))}
          </div>

          <p className='mt-2 text-gray-700 text-sm leading-relaxed'>{text}</p>

          <div className='flex items-center gap-4 mt-3'>
            <button
              onClick={() => {
                setLiked(p => !p);
                setLikeCount((p: number) => liked ? p - 1 : p + 1);
              }}
              className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-blue-500' : ''}`}/>
              <span>{likeCountState}</span>
            </button>

            {/* <button className='flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs transition-colors'>
              <MessageSquare className='w-3.5 h-3.5'/>
              <span>{review.replies} respostas</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;