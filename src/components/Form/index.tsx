import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import InputField from 'components/InputField';
import Container from 'components/Container';
import Tag from 'components/Tag';
import Button from 'components/Button';

import { useBooksContext } from 'context/Books';
import { useModalContext } from 'context/Modal';

import styles from './Form.module.scss';

interface Props {
    submitText: string
    toastMessage: string
    bookID?: string
}

function Form({ submitText, toastMessage, bookID }: Props) {
    const navigate = useNavigate();
    const { books, tags, createBook, editBook } = useBooksContext();
    const { closeModal } = useModalContext();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [img, setImg] = useState<File | undefined>();

    const spanRef = useRef<HTMLSpanElement>(null);

    function handleTagSelect(id: string) {
        const selected = tags.find(tag => tag.id === id);

        if (selected) {
            // Verificando se a tag já foi selecionada

            if (selectedTags.includes(selected.id)) {
                const newTags = selectedTags.filter(tagID => tagID !== selected.id);
                setSelectedTags(newTags);
            } else {
                setSelectedTags(prevState => [...prevState, selected.id]);
            }
        }
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const image = event.target.files[0];
            setImg(image);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (bookID) {
            editBook(title, author, img, selectedTags, bookID);
            closeModal();
        } else {
            createBook(title, author, img, selectedTags);

            setTitle('');
            setAuthor('');
            setSelectedTags([]);
            setImg(undefined);

            navigate('/');
        }

        toast.success(toastMessage);
    }

    useEffect(() => {
        if (spanRef && spanRef.current && img) {
            spanRef.current.style.backgroundImage = `url(${URL.createObjectURL(img)})`;
        }
    }, [img]);

    useEffect(() => {
        if (bookID) {
            const book = books.find(bk => bk.id === bookID);
            
            if (book) {
                setTitle(book.title);
                setAuthor(book.author);
                setSelectedTags(book.tags.map(tag => tag.id));
                setImg(book.img);
            }
        }
    }, []);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.img_input}>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                />

                <span ref={spanRef} style={ img && { backgroundImage: `url(${URL.createObjectURL(img)})` }}>
                    Escolha uma imagem
                </span>
            </label>

            <div className={styles.modal_inputs}>
                <InputField
                    label='Nome do livro'
                    type='text'
                    value={title}
                    setValue={setTitle}
                />

                <InputField
                    label='Nome do autor'
                    type='text'
                    value={author}
                    setValue={setAuthor}
                />
            </div>

            <div className={styles.wrapper}>
                <Container display='flex'>
                    {tags.map(tag => (
                        <Tag
                            {...tag}
                            select={handleTagSelect}
                            selected={selectedTags.includes(tag.id)}
                            key={tag.id}
                        />
                    ))}
                </Container>

                <Button type='submit'
                    style={{
                        width: '50%',
                        maxWidth: 250,
                        fontSize: 20
                    }}
                >
                    {submitText}
                </Button>
            </div>
        </form>
    );
}

export default Form;