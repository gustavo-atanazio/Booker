import { useEffect, useRef, useState } from 'react';

import InputField from 'components/InputField';
import Container from 'components/Container';
import Tag from 'components/Tag';
import Button from 'components/Button';

import { useBooksContext } from 'context/Books';
import { useModalContext } from 'context/Modal';
import IBook from 'types/IBook';

import styles from './ModalForm.module.scss';

interface ModalFormProps extends IBook {
    bookTags: string[]
}

function ModalForm({ img, title, author, bookTags, id }: ModalFormProps) {
    const { editBook, tags } = useBooksContext();
    const { closeModal } = useModalContext();

    const [image, setImage] = useState<File | undefined>();
    const [newTitle, setNewTitle] = useState(title);
    const [newAuthor, setNewAuthor] = useState(author);
    const [selectedTags, setSelectedTags] = useState(bookTags);

    const spanRef = useRef<HTMLSpanElement>(null);

    function handleTagSelect(tagID: string) {
        setSelectedTags(prevSelectedTags => {
            if (prevSelectedTags.includes(tagID)) {
                return prevSelectedTags.filter(id => id !== tagID);
            } else {
                return [...prevSelectedTags, tagID];
            }
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        editBook(newTitle, newAuthor, image, selectedTags, id);
        closeModal();
    }

    useEffect(() => {
        if (spanRef && spanRef.current && image) {
            spanRef.current.style.backgroundImage = `url(${URL.createObjectURL(image)})`;
        }
    }, [image]);

    return (
        <form className={styles.modal_form} onSubmit={handleSubmit}>
            <label className={styles.img_input}>
                <input
                    type='file'
                    accept='image/*'
                    onChange={event => {
                        if (event.target.files && event.target.files.length > 0) {
                            const image = event.target.files[0];
                            setImage(image);
                        }
                    }}
                />

                <span ref={spanRef} style={ img && { backgroundImage: `url(${URL.createObjectURL(img)})` }}>
                    Escolha uma imagem
                </span>
            </label>

            <div className={styles.modal_inputs}>
                <InputField
                    label='Nome do livro'
                    type='text'
                    value={newTitle}
                    setValue={setNewTitle}
                />

                <InputField
                    label='Nome do autor'
                    type='text'
                    value={newAuthor}
                    setValue={setNewAuthor}
                />
            </div>

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
                    padding: '0.5rem 1rem',
                    fontSize: 20,
                    maxWidth: 250
                }}
            >
                Editar
            </Button>
        </form>
    );
}

export default ModalForm;