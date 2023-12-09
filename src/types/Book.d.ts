import { Tag } from './Tag';

interface Book {
    img: File | undefined
    title: string
    author: string
    tags: Tag[]
    id: string
}

export default Book;