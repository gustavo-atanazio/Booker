import type AppUser from '@/types/AppUser';

const currentUser: AppUser = {
  id: 'u1',
  name: 'Ana Beatriz',
  username: 'anabeatriz',
  bio: 'Leitora voraz. Amo ficção científica, distopias e qualquer livro que me faça pensar no universo às 3h da manhã. ☕📚',
  location: 'São Paulo, SP',
  joinDate: 'Março 2023',
  booksRead: 47,
  avgRating: 4.2,
  yearlyGoal: 52,
  yearlyProgress: 31,
  currentlyReading: ['3', '6'],
  readBooks: ['1', '2', '4', '5', '7', '8', '9', '10'],
  wantToRead: ['3', '6'],
  favoriteGenres: ['Ficção Distópica', 'Fantasia Épica', 'Ficção Científica', 'Realismo Mágico', 'Horror Gótico']
};

export default currentUser;