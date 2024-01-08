import { createContext, useContext, useEffect, useState } from 'react';

import tags from './tags';

import IBook from 'types/IBook';
import ITag from 'types/ITag';

import { getFromLocalStorage } from 'utils/localStorage';
import { updateLocalStorage } from 'utils/localStorage';
import { removeScript } from 'utils/remove-script';

interface IBooksContext {
    books: IBook[]
    setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    createBook: (title: string, author: string, img: IBook['img'], tags: string[]) => void
    editBook: (title: string, author: string, img: IBook['img'], tagsID: string[], id: string) => void
    deleteBook: (id: string) => void
    tags: ITag[]
}

const initialValue = {
    books: getFromLocalStorage('BOOKS'),
    setBooks: () => {},
    createBook: () => {},
    editBook: () => {},
    deleteBook: () => {},
    tags: []
};

const BooksContext = createContext<IBooksContext>(initialValue);

function BooksProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<IBook[]>(initialValue.books);

    function createBook(title: string, author: string, img: IBook['img'], tagsID: string[]) {
        const book: IBook = {
            title: removeScript(title),
            author: removeScript(author),
            img,
            tags: tagsID.map(tagID => tags.find(tag => tag.id === tagID)) as ITag[],
            id: crypto.randomUUID()
        };
    
        setBooks(prevState => [...prevState, book]);
    }

    function editBook(title: string, author: string, img: IBook['img'], tagsID: string[], id: string) {
        setBooks(prevState => {
            return prevState.map(book => {
                return book.id === id
                    ? {
                        ...book,
                        title: removeScript(title),
                        author: removeScript(author),
                        img: img || book.img,
                        tags: tagsID.map(tagID => tags.find(tag => tag.id === tagID)) as ITag[]
                    }
                    : book;
            });
        });
    }

    function deleteBook(id: string) {
        const updatedBooks = books.filter(book => book.id !== id);
        setBooks(updatedBooks);
    }

    const value = {
        books,
        setBooks,
        createBook,
        editBook,
        deleteBook,
        tags
    };

    useEffect(() => {
        updateLocalStorage('BOOKS', books);
    }, [books]);

    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    );
}

function useBooksContext() {
    return useContext(BooksContext);
}

export { BooksContext, BooksProvider, useBooksContext };