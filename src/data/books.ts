import type Book from '@/types/Book';

const books: Book[] = [
  {
    id: '1',
    title: 'O Conto da Aia',
    author: 'Margaret Atwood',
    coverUrl: 'https://images.unsplash.com/photo-1698195811212-2cdb4a0232f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 1985,
    pages: 311,
    genre: 'Ficção Distópica',
    rating: 4.8,
    ratingsCount: 15420,
    description: 'Em Gilead, uma teocracia totalitária que substituiu os Estados Unidos, as mulheres são privadas de todos os direitos. Offred é uma Aia, cuja única função é conceber filhos para o Comandante e sua esposa. Neste mundo de vigilância constante e obediência forçada, ela tenta sobreviver — e, talvez, resistir.',
    publisher: 'Rocco',
    isbn: '978-85-325-1234-5'
  },
  {
    id: '2',
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    coverUrl: 'https://images.unsplash.com/photo-1762020284758-15535e5a40a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 1813,
    pages: 432,
    genre: 'Romance',
    rating: 4.7,
    ratingsCount: 22103,
    description: 'A história de Elizabeth Bennet e o orgulhoso Sr. Darcy é um dos romances mais amados da literatura inglesa. Com humor ácido e uma perspicaz observação social, Austen retrata a vida das classes médias e altas da Inglaterra do século XIX.',
    publisher: 'Penguin Companhia',
    isbn: '978-85-791-1234-0'
  },
  {
    id: '3',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://images.unsplash.com/photo-1763315371267-86318801d8ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 2007,
    pages: 662,
    genre: 'Fantasia Épica',
    rating: 4.9,
    ratingsCount: 31567,
    description: 'A lendária história de Kvothe — contada por ele mesmo — de sua vida como músico, mago e herói. Desde a infância itinerante entre os Edema Ruh até os anos de estudo na Universidade, esta é uma fantasia épica de tirar o fôlego sobre lendas e a criação delas.',
    publisher: 'Arqueiro',
    isbn: '978-85-797-1234-6'
  },
  {
    id: '4',
    title: 'Dom Quixote',
    author: 'Miguel de Cervantes',
    coverUrl: 'https://images.unsplash.com/photo-1763571084092-a4306456166b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 1605,
    pages: 863,
    genre: 'Ficção Clássica',
    rating: 4.5,
    ratingsCount: 9870,
    description: 'Considerado o primeiro romance moderno, Dom Quixote de la Mancha narra as aventuras de Alonso Quijano, um hidalgo que enlouquece de tanto ler livros de cavalaria e decide se tornar um cavaleiro andante. Uma obra-prima atemporal sobre ilusão, idealismo e a natureza da realidade.',
    publisher: 'Editora 34',
    isbn: '978-85-736-1234-1'
  },
  {
    id: '5',
    title: 'Garota Exemplar',
    author: 'Gillian Flynn',
    coverUrl: 'https://images.unsplash.com/photo-1766878778095-6904f52cd523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 2012,
    pages: 422,
    genre: 'Ficção Psicológica',
    rating: 4.6,
    ratingsCount: 18934,
    description: 'No dia de seu quinto aniversário de casamento, Amy Dunne desaparece. Seu marido Nick logo se torna o principal suspeito. Mas Amy não é quem parece ser. Um thriller psicológico alucinante sobre mentiras, mídia e o lado obscuro do casamento americano.',
    publisher: 'Intrínseca',
    isbn: '978-85-819-1234-2'
  },
  {
    id: '6',
    title: 'Fundação',
    author: 'Isaac Asimov',
    coverUrl: 'https://images.unsplash.com/photo-1612570328404-fc96e7ba6d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 1951,
    pages: 285,
    genre: 'Ficção Científica',
    rating: 4.7,
    ratingsCount: 12456,
    description: 'O matemático Hari Seldon prevê a queda do Império Galáctico usando a psicohistória — a ciência que prediz o comportamento de grandes populações. Para encurtar mil anos de trevas a apenas três séculos, ele funda a Fundação. Um épico de civilizações que moldou a ficção científica.',
    publisher: 'Aleph',
    isbn: '978-85-769-1234-3'
  },
  {
    id: '7',
    title: 'A Menina que Roubava Livros',
    author: 'Markus Zusak',
    coverUrl: 'https://images.unsplash.com/photo-1695796590736-23612ac1ef88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 2005,
    pages: 544,
    genre: 'Ficção Histórica',
    rating: 4.8,
    ratingsCount: 27843,
    description: 'Narrado pela própria Morte durante a Segunda Guerra Mundial, o livro acompanha Liesel Meminger, uma menina que encontra refúgio nas palavras enquanto o mundo ao redor desmorona. Uma ode à força das histórias e ao amor em tempos de guerra.',
    publisher: 'Intrínseca',
    isbn: '978-85-819-5678-9'
  },
  {
    id: '8',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    coverUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 1988,
    pages: 208,
    genre: 'Ficção',
    rating: 4.3,
    ratingsCount: 34210,
    description: 'Santiago, um jovem pastor andaluz, parte em busca de um tesouro no Egito. Nessa jornada pelo deserto, encontra o alquimista e aprende a ler os sinais do universo e a seguir sua Lenda Pessoal. O livro mais vendido de um autor brasileiro em toda a história.',
    publisher: 'HarperCollins',
    isbn: '978-85-944-1234-4'
  },
  {
    id: '9',
    title: 'Cem Anos de Solidão',
    author: 'Gabriel García Márquez',
    coverUrl: 'https://images.unsplash.com/photo-1773125456596-d2a952fb9b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 1967,
    pages: 417,
    genre: 'Realismo Mágico',
    rating: 4.9,
    ratingsCount: 19875,
    description: 'A saga da família Buendía ao longo de sete gerações na fictícia cidade de Macondo é a obra máxima do realismo mágico. Com uma prosa exuberante, García Márquez entrelaça o histórico e o fantástico numa narrativa que é, ao mesmo tempo, íntima e universal.',
    publisher: 'Record',
    isbn: '978-85-010-1234-7'
  },
  {
    id: '10',
    title: 'Drácula',
    author: 'Bram Stoker',
    coverUrl: 'https://images.unsplash.com/photo-1574013573452-2d89828155a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: 1897,
    pages: 418,
    genre: 'Horror Gótico',
    rating: 4.5,
    ratingsCount: 11234,
    description: 'O jovem advogado Jonathan Harker viaja para a Transilvânia para fechar um negócio imobiliário com o misterioso Conde Drácula — e descobre que seu anfitrião não é humano. O clássico definitivo do vampiro que influenciou toda a cultura de horror por mais de um século.',
    publisher: 'Landmark',
    isbn: '978-85-789-1234-8'
  },
  {
    id: '11',
    title: 'A Bíblia Sagrada',
    author: 'Vários Autores',
    coverUrl: 'https://images.unsplash.com/photo-1773064722294-6701a6080444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    year: -1400,
    pages: 1328,
    genre: 'Religião',
    rating: 4.9,
    ratingsCount: 98750,
    description: 'A Bíblia Sagrada é a coleção de textos sagrados do judaísmo e do cristianismo, composta por 66 livros divididos em Antigo e Novo Testamento. Escrita ao longo de mais de mil anos por dezenas de autores, é o livro mais vendido e lido de toda a história da humanidade, reunindo poesia, história, profecia, cartas e narrativas que moldaram civilizações inteiras.',
    publisher: 'Sociedade Bíblica do Brasil',
    isbn: '978-85-311-0000-1'
  }
];

function getBookById(id: string): Book | undefined {
  return books.find(b => b.id === id);
}

function getRelatedBooks(bookId: string, genre: string): Book[] {
  return books.filter(b => b.id !== bookId && b.genre === genre).slice(0, 3);
}

export {
  books,
  getBookById,
  getRelatedBooks
};