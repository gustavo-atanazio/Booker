import type DefaultEntity from '@/types/DefaultEntity';
import type User from '@/types/User';
import type { BookSummary } from '@/types/Book';

type Review = DefaultEntity & {
  score: number;
  headline: string;
  text: string;
  likeCount: number;
  user: User;
  book: BookSummary;
};

type ReviewSummary = Pick<Review, 'id' | 'score' | 'headline' | 'text' | 'likeCount' | 'user' | 'createdAt' | 'updatedAt'>;

export { ReviewSummary };
export default Review;