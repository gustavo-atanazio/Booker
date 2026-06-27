import type Activity from '@/types/Activity';

const activities: Activity[] = [
  {
    id: 'a1',
    user: {
      name: 'Lucas Ferreira',
      username: 'lucasf',
      initials: 'LF',
      color: 'blue'
    },
    book: {
      id: '1',
      title: 'O Conto da Aia',
      author: 'Margaret Atwood',
      coverUrl: 'https://images.unsplash.com/photo-1698195811212-2cdb4a0232f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Ficção Distópica'
    },
    action: 'reviewed',
    rating: 5,
    excerpt: 'Uma obra assustadoramente atual. Atwood escreve com uma precisão cirúrgica que deixa a gente sem ar. Cada página é um soco no estômago e uma meditação sobre liberdade.',
    date: 'há 2 horas',
    likes: 34,
    comments: 8
  },
  {
    id: 'a2',
    user: {
      name: 'Mariana Costa',
      username: 'maricosta',
      initials: 'MC',
      color: 'indigo'
    },
    book: {
      id: '3',
      title: 'O Nome do Vento',
      author: 'Patrick Rothfuss',
      coverUrl: 'https://images.unsplash.com/photo-1763315371267-86318801d8ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Fantasia Épica'
    },
    action: 'finished',
    rating: 5,
    excerpt: 'Kvothe é um dos personagens mais bem construídos que já li. A narrativa em camadas é brilhante — você sabe que ele sobrevive, mas isso não tira nem um pingo de tensão.',
    date: 'há 5 horas',
    likes: 57,
    comments: 14
  },
  {
    id: 'a3',
    user: {
      name: 'Pedro Alves',
      username: 'pedroalves',
      initials: 'PA',
      color: 'emerald'
    },
    book: {
      id: '9',
      title: 'Cem Anos de Solidão',
      author: 'Gabriel García Márquez',
      coverUrl: 'https://images.unsplash.com/photo-1773125456596-d2a952fb9b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Realismo Mágico'
    },
    action: 'reading',
    date: 'há 7 horas',
    likes: 21,
    comments: 3
  },
  {
    id: 'a4',
    user: {
      name: 'Sofia Lima',
      username: 'sofilima',
      initials: 'SL',
      color: 'violet'
    },
    book: {
      id: '5',
      title: 'Garota Exemplar',
      author: 'Gillian Flynn',
      coverUrl: 'https://images.unsplash.com/photo-1766878778095-6904f52cd523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Ficção Psicológica'
    },
    action: 'reviewed',
    rating: 4,
    excerpt: 'Flynn é absolutamente cruel com seus personagens e isso é um elogio. Amy Dunne é um dos vilões mais complexos e fascinantes da literatura contemporânea.',
    date: 'há 12 horas',
    likes: 89,
    comments: 22
  },
  {
    id: 'a5',
    user: {
      name: 'Rafael Santos',
      username: 'rafasantos',
      initials: 'RS',
      color: 'orange'
    },
    book: {
      id: '6',
      title: 'Fundação',
      author: 'Isaac Asimov',
      coverUrl: 'https://images.unsplash.com/photo-1612570328404-fc96e7ba6d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Ficção Científica'
    },
    action: 'wants',
    date: 'há 1 dia',
    likes: 12,
    comments: 2
  },
  {
    id: 'a6',
    user: {
      name: 'Isabela Rocha',
      username: 'isarocha',
      initials: 'IR',
      color: 'pink'
    },
    book: {
      id: '7',
      title: 'A Menina que Roubava Livros',
      author: 'Markus Zusak',
      coverUrl: 'https://images.unsplash.com/photo-1695796590736-23612ac1ef88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Ficção Histórica'
    },
    action: 'finished',
    rating: 5,
    excerpt: 'Chorei do começo ao fim. Liesel é uma personagem que nunca vou esquecer. E a Morte como narradora é uma das escolhas mais geniais da literatura moderna.',
    date: 'há 1 dia',
    likes: 143,
    comments: 31
  },
  {
    id: 'a7',
    user: {
      name: 'Thiago Nunes',
      username: 'thiagonunes',
      initials: 'TN',
      color: 'cyan'
    },
    book: {
      id: '2',
      title: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      coverUrl: 'https://images.unsplash.com/photo-1762020284758-15535e5a40a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Romance'
    },
    action: 'reviewed',
    rating: 4,
    excerpt: 'Surpreendentemente engraçado e moderno para um livro de 1813. Elizabeth Bennet é uma heroína que qualquer leitor contemporâneo pode admirar.',
    date: 'há 2 dias',
    likes: 67,
    comments: 11
  },
  {
    id: 'a8',
    user: {
      name: 'Camila Teixeira',
      username: 'camilatx',
      initials: 'CT',
      color: 'amber'
    },
    book: {
      id: '10',
      title: 'Drácula',
      author: 'Bram Stoker',
      coverUrl: 'https://images.unsplash.com/photo-1574013573452-2d89828155a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      genre: 'Horror Gótico'
    },
    action: 'reading',
    date: 'há 2 dias',
    likes: 28,
    comments: 5
  }
];

export default activities;