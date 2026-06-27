import { books } from '@/data/books';

const featuredBooks = [...books].sort((a, b) => b.ratingsCount - a.ratingsCount).slice(0, 5);
const popularBooks = [...books].sort((a, b) => b.rating - a.rating);
const classicBooks = books.slice(0, 4);

export {
  featuredBooks,
  popularBooks,
  classicBooks
};