type ActivityUser = {
  name: string;
  username: string;
  initials: string;
  color: 'blue' | 'indigo' | 'emerald' | 'violet' | 'orange' | 'pink' | 'cyan' | 'amber';
};

type ActivityBook = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
};

type ActionType = 'reviewed' | 'finished' | 'wants' | 'reading';

type Activity = {
  id: string;
  user: ActivityUser;
  book: ActivityBook;
  action: ActionType;
  rating?: number;
  excerpt?: string;
  date: string;
  likes: number;
  comments: number;
};

export default Activity;