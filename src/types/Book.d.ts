import type DefaultEntity from '@/types/DefaultEntity';
import type Author from '@/types/Author';
import type Genre from '@/types/Genre';

type Book = DefaultEntity & {
  title: string;
  synopsis: string;
  pageCount: number;
  author: Author;
  genres: Genre[];
  coverUrl: string;
  releaseYear: number;
  rating: number;
  ratingsCount: number;
};

type BookSummary = Pick<Book,
  'id' |
  'title' |
  'synopsis' |
  'pageCount' |
  'coverUrl' |
  'createdAt' |
  'updatedAt' |
  'releaseYear' |
  'rating' |
  'ratingsCount'
> & {
  authorName: string;
  genres: string[];
};

export { BookSummary };
export default Book;