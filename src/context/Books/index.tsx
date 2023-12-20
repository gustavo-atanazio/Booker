import { createContext, useContext, useState } from 'react';
import tags from './tags';
import IBook from 'types/IBook';
import ITag from 'types/ITag';

interface IBooksContext {
    books: IBook[]
    setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    createBook: (title: IBook['title'], author: IBook['author'], img: IBook['img'], tags: string[]) => void
    editBook: (title: IBook['title'], author: IBook['author'], img: IBook['img'], tagsID: string[], id: string) => void
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
    editBook: () => {},
    deleteBook: () => {},
    tags: []
};

const BooksContext = createContext<IBooksContext>(initialValue);

function BooksProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<IBook[]>(initialValue.books);

    function createBook(title: IBook['title'], author: IBook['author'], img: IBook['img'], tagsID: string[]) {
        const book: IBook = {
            title,
            author,
            img,
            tags: tagsID.map(tagID => tags.find(tag => tag.id === tagID)) as ITag[],
            id: crypto.randomUUID()
        };

        setBooks(prevState => [...prevState, book]);
    }

    function editBook(title: IBook['title'], author: IBook['author'], img: IBook['img'], tagsID: string[], id: string) {
        setBooks(prevState => {
            return prevState.map(book => {
                return book.id === id
                    ?
                    {
                        ...book,
                        title,
                        author,
                        img: img || book.img,
                        tags: tagsID.map(tagID => tags.find(tag => tag.id === tagID)) as ITag[]
                    }
                    : book;
            });
        });
    }

    function deleteBook(id: string) {
        const updatedBooks = books.filter(item => item.id !== id);
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