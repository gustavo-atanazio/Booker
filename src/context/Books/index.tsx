import { createContext, useContext, useState } from 'react';
import tags from './tags';
import IBook from 'types/IBook';
import ITag from 'types/ITag';

interface IBooksContext {
    books: IBook[]
    setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    createBook: (title: IBook['title'], author: IBook['author'], img: IBook['img'], tags: IBook['tags']) => void
    tags: ITag[]
}

const initialValue = {
    books: [{
        img: undefined,
        title: 'Harry Potter',
        author: 'J. K. Rowling',
        tags: [tags[0]],
        id: crypto.randomUUID()
    }],
    setBooks: () => {},
    createBook: () => {},
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