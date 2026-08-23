import type { ReviewSummary } from '@/types/Review';
import type { UUID } from 'crypto';

const reviewsByBook: Record<string, ReviewSummary[]> = {
  default: [
    {
      id: '11111111-1111-1111-1111-111111111111' as UUID,
      user: {
        id: '22222222-2222-2222-2222-222222222222' as UUID,
        name: 'Lucas Ferreira',
        username: 'lucasf',
        email: 'lucasf@example.com',
        bio: 'Leitor ávido',
        createdAt: '2026-03-15T10:00:00Z',
        updatedAt: '2026-03-15T10:00:00Z'
      },
      score: 5,
      headline: 'Obra magistral',
      updatedAt: '2026-03-15T10:00:00Z',
      createdAt: '2026-03-15T10:00:00Z',
      text: 'Uma obra absolutamente magistral. A construção do mundo é densa e convincente, e a narrativa nunca perde o fôlego. Um dos melhores livros que li nos últimos anos.',
      likeCount: 47
    }
  ]
};

export default reviewsByBook;