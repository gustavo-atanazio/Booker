import { useEffect, useRef, useState } from 'react';

import InputField from 'components/InputField';
import Container from 'components/Container';
import Tag from 'components/Tag';
import Button from 'components/Button';

import { useBooksContext } from 'context/Books';
import styles from './Form.module.scss';

function Form() {
    const { tags, createBook } = useBooksContext();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [img, setImg] = useState<File | undefined>();

    const spanRef = useRef<HTMLSpanElement>(null);

    function handleSelect(id: string) {
        const selected = tags.find(tag => tag.id === id);
        if (selected) setSelectedTags(prevState => [...prevState, selected.id]);
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const image = event.target.files[0];
            setImg(image);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        createBook(title, author, img, selectedTags);

        setTitle('');
        setAuthor('');
        setSelectedTags([]);
        setImg(undefined);
    }

    useEffect(() => {
        if (spanRef && spanRef.current && img) {
            spanRef.current.style.backgroundImage = `url(${URL.createObjectURL(img)})`;
        }
    }, [img]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField
                type='text'
                label='Nome do livro'
                required={true}
                value={title}
                setValue={setTitle}
            />

            <InputField
                type='text'
                label='Autor'
                required={true}
                value={author}
                setValue={setAuthor}
            />

            <h3>Tags</h3>
            
            <Container display='flex'>
                {tags.map(tag => (
                    <Tag
                        {...tag}
                        select={handleSelect}
                        selected={selectedTags.includes(tag.id)}
                        key={tag.id}
                    />
                ))}
            </Container>

            <label className={styles.img_input}>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                />

                <span ref={spanRef}>Escolha uma imagem</span>
            </label>

            <Button type='submit'
                backgroundColor='#3D5A80'
                color='#FFF'
                width='50%'
                fontSize={20}
            >
                Criar
            </Button>
        </form>
    );
}

export default Form;