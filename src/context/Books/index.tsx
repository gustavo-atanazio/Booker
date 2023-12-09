import { createContext, useContext, useState } from 'react';
import Book from 'types/Book';
import { Tag } from 'types/Tag';

interface BooksContextType {
    books: Book[]
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>
    createBook: (title: string, author: string, img: File | null, tags: Tag[]) => void
    tags: Tag[]
}

const initialValue = {
    books: [],
    setBooks: () => {},
    createBook: () => {},
    tags: []
};

const BooksContext = createContext<BooksContextType>(initialValue);

const tags: Tag[] = [
    {
        text: 'Aventura',
        color: 'green',
        id: crypto.randomUUID()
    },
    {
        text: 'Romance',
        color: 'pink',
        id: crypto.randomUUID()
    },
    {
        text: 'Ação',
        color: 'red',
        id: crypto.randomUUID()
    },
    {
        text: 'Ficção científica',
        color: 'blue',
        id: crypto.randomUUID()
    },
    {
        text: 'Terror',
        color: 'purple',
        id: crypto.randomUUID()
    },
    {
        text: 'Didático',
        color: 'yellow',
        id: crypto.randomUUID()
    },
    {
        text: 'Auto-ajuda',
        color: 'orange',
        id: crypto.randomUUID()
    },
    {
        text: 'Outro',
        color: 'gray',
        id: crypto.randomUUID()
    }
];

function BooksProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<Book[]>(initialValue.books);

    function createBook(title: string, author: string, img: File | null, tags: Tag[]) {
        const book: Book = {
            title,
            author,
            img,
            tags,
            id: crypto.randomUUID()
        };

        setBooks(prevState => [...prevState, book]);
    }

    const value = {
        books,
        setBooks,
        createBook,
        tags
    };

    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    );
}

function useBooksContext() {
    return useContext(BooksContext);
}

export {
    BooksContext,
    BooksProvider,
    useBooksContext
};