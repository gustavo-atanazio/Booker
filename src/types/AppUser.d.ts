type AppUser = {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  joinDate: string;
  booksRead: number;
  avgRating: number;
  yearlyGoal: number;
  yearlyProgress: number;
  currentlyReading: string[];
  readBooks: string[];
  wantToRead: string[];
  favoriteGenres: string[];
};

export default AppUser;