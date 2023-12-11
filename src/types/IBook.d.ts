import ITag from './ITag';

interface IBook {
    img: File | undefined
    title: string
    author: string
    tags: ITag[]
    id: string
}

export default IBook;