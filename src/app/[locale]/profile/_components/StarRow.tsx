import { Star } from 'lucide-react';

function StarRow({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default StarRow;