'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

import ImageWithFallback from '@/components/ImageWithFallback';
import StarRow from './components/StarRow';

import type Activity from '@/types/Activity';

const colorMap: Record<string, string> = {
  blue:    'bg-blue-500',
  indigo:  'bg-indigo-500',
  emerald: 'bg-emerald-500',
  violet:  'bg-violet-500',
  orange:  'bg-orange-500',
  pink:    'bg-pink-500',
  cyan:    'bg-cyan-500',
  amber:   'bg-amber-500'
};

const actionLabels: Record<string, string> = {
  reviewed: 'avaliou',
  finished: 'terminou de ler',
  wants: 'quer ler',
  reading: 'está lendo'
};

type ActivityCardProps = {
  activity: Activity;
};

function ActivityCard({ activity }: ActivityCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(activity.likes);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className='bg-white hover:shadow-sm p-4 border border-gray-100 rounded-2xl transition-shadow'>
      <div className='flex gap-3'>
        <div className={`w-10 h-10 rounded-full ${colorMap[activity.user.color]} flex items-center justify-center flex-shrink-0`}>
          <span className='font-bold text-white text-sm'>{activity.user.initials}</span>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-start gap-2'>
            <div>
              <span className='font-semibold text-gray-900 text-sm'>{activity.user.name}</span>
              <span className='ml-1 text-gray-400 text-xs'>@{activity.user.username}</span>
              <span className='text-gray-500 text-sm'> {actionLabels[activity.action]}</span>
            </div>

            <span className='flex-shrink-0 text-gray-400 text-xs'>{activity.date}</span>
          </div>

          {activity.rating && (
            <div className='mt-1'>
              <StarRow rating={activity.rating}/>
            </div>
          )}

          <Link
            href={`/book/${activity.book.id}`}
            className='flex gap-3 bg-gray-50 hover:bg-gray-100 mt-3 p-2.5 rounded-xl transition-colors'
          >
            <ImageWithFallback
              src={activity.book.coverUrl}
              alt={activity.book.title}
              className='flex-shrink-0 rounded-lg w-12 h-16 object-cover'
            />

            <div className='flex-1 min-w-0'>
              <p className='font-semibold text-gray-900 text-sm truncate'>{activity.book.title}</p>
              <p className='text-gray-500 text-xs'>{activity.book.author}</p>

              <span className='inline-block bg-yellow-400/20 mt-1 px-2 py-0.5 rounded-full text-yellow-700 text-xs'>
                {activity.book.genre}
              </span>
            </div>
          </Link>

          {activity.excerpt && (
            <blockquote className='mt-3 pl-3 border-yellow-400 border-l-2 text-gray-600 text-sm italic'>
              {activity.excerpt}
            </blockquote>
          )}

          <div className='flex items-center gap-4 mt-3 pt-3 border-gray-50 border-t'>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`}/>
              <span>{likeCount}</span>
            </button>

            <button className='flex items-center gap-1.5 text-gray-400 hover:text-blue-500 text-xs transition-colors'>
              <MessageCircle className='w-4 h-4'/>
              <span>{activity.comments}</span>
            </button>

            <button
              onClick={() => setSaved(prev => !prev)}
              className={`flex items-center gap-1.5 text-xs ml-auto transition-colors ${saved ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-yellow-500' : ''}`}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;