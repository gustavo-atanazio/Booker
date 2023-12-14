import { createContext, useContext, useState } from 'react';
import tags from './tags';
import IBook from 'types/IBook';
import ITag from 'types/ITag';

interface IBooksContext {
    books: IBook[]
    setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    createBook: (title: IBook['title'], author: IBook['author'], img: IBook['img'], tags: IBook['tags']) => void
    deleteBook: (id: string) => void
    tags: ITag[]
}

const initialValue = {
    books: [{
        img: undefined,
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J. K. Rowling',
        tags: [tags[0], tags[5], tags[1], tags[2]],
        id: crypto.randomUUID()
    }, {
        img: undefined,
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J. K. Rowling',
        tags: [tags[0], tags[5]],
        id: crypto.randomUUID()
    }, {
        img: undefined,
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J. K. Rowling',
        tags: [tags[0], tags[5]],
        id: crypto.randomUUID()
    }, {
        img: undefined,
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J. K. Rowling',
        tags: [tags[0], tags[5]],
        id: crypto.randomUUID()
    }],
    setBooks: () => {},
    createBook: () => {},
    deleteBook: () => {},
    tags: []
};

const BooksContext = createContext<IBooksContext>(initialValue);

function BooksProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<IBook[]>(initialValue.books);

    function createBook(title: IBook['title'], author: IBook['author'], img: IBook['img'], tags: IBook['tags']) {
        const book: IBook = {
            title,
            author,
            img,
            tags,
            id: crypto.randomUUID()
        };

        setBooks(prevState => [...prevState, book]);
    }

    function deleteBook(id: string) {
        const updatedBooks = books.filter(item => item.id !== id);
        setBooks(updatedBooks);
    }

    const value = {
        books,
        setBooks,
        createBook,
        deleteBook,
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