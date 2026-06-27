import type Review from '@/types/Review';

const reviewsByBook: Record<string, Review[]> = {
  default: [
    {
      id: 'r1',
      name: 'Lucas Ferreira',
      username: 'lucasf',
      initials: 'LF',
      color: 'bg-blue-500',
      rating: 5,
      date: '15 Mar 2026',
      text: 'Uma obra absolutamente magistral. A construção do mundo é densa e convincente, e a narrativa nunca perde o fôlego. Um dos melhores livros que li nos últimos anos.',
      likes: 47,
      replies: 8
    },
    {
      id: 'r2',
      name: 'Sofia Lima',
      username: 'sofilima',
      initials: 'SL',
      color: 'bg-violet-500',
      rating: 4,
      date: '10 Mar 2026',
      text: 'Muito bom, mas o ritmo do meio cai um pouco. O final, porém, compensa tudo. Recomendo demais para qualquer fã do gênero.',
      likes: 23,
      replies: 3
    },
    {
      id: 'r3',
      name: 'Thiago Nunes',
      username: 'thiagonunes',
      initials: 'TN',
      color: 'bg-cyan-500',
      rating: 5,
      date: '5 Mar 2026',
      text: 'Simplesmente perfeito. A escrita é uma das mais bonitas que já encontrei. Li duas vezes e a segunda leitura revelou detalhes que passei por cima na primeira.',
      likes: 61,
      replies: 12
    },
    {
      id: 'r4',
      name: 'Camila Teixeira',
      username: 'camilatx',
      initials: 'CT',
      color: 'bg-amber-500',
      rating: 4,
      date: '28 Fev 2026',
      text: 'Excelente livro. A premissa é muito criativa e a execução é quase perfeita. Minha única ressalva é que alguns capítulos se sentem desnecessariamente longos.',
      likes: 18,
      replies: 2
    }
  ]
};

export default reviewsByBook;