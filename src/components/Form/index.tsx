import { useState } from 'react';

import InputField from 'components/InputField';
import TagsContainer from 'components/TagsContainer';
import Tag from 'components/Tag';

import { useBooksContext } from 'context/Books';
import { Tag as ITag } from 'types/Tag';
import styles from './Form.module.scss';

function Form() {
    const { tags, createBook } = useBooksContext();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
    const [img, setImg] = useState<File | undefined>();

    function handleSelect(id: string) {
        const selected = tags.find(tag => tag.id === id);
        if (selected) setSelectedTags(prevState => [...prevState, selected]);
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
            
            <TagsContainer>
                {tags.map(tag => (
                    <Tag
                        {...tag}
                        select={handleSelect}
                        key={tag.id}
                    />
                ))}
            </TagsContainer>

            <label className={styles.img_input}>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                />

                <span>Escolha uma imagem</span>
            </label>

            <button type='submit'>Criar</button>
        </form>
    );
}

export default Form;