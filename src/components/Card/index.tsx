import Placeholder from 'assets/img/img-placeholder.svg?react';
import Container from 'components/Container';
import Tag from 'components/Tag';
import Button from 'components/Button';

import { useBooksContext } from 'context/Books';
import IBook from 'types/IBook';
import styles from './Card.module.scss';

function Card({ img, title, author, tags, id }: IBook) {
    const { deleteBook } = useBooksContext();

    return (
        <div className={styles.card}>
            <div>
                {img
                    ? <img src={URL.createObjectURL(img)} alt={`Capa do livro ${title}`}/>
                    : <Placeholder/>
                }
            </div>

            <h4>{title}</h4>
            <span>{author}</span>

            <Container display='flex'>
                {tags.map(tag => (
                    <Tag
                        backgroundColor={tag.backgroundColor}
                        color={tag.color}
                        text={tag.text}
                        disabled={true}
                        key={tag.id}
                    />
                ))}
            </Container>

            <Container display='flex'>
                <Button
                    type='button'
                    backgroundColor='#777'
                    color='#FFF'
                    padding='0.5rem 1rem'
                >
                    Editar
                </Button>
                
                <Button
                    type='button'
                    backgroundColor='#E71010'
                    color='#FFF'
                    padding='0.5rem 1rem'
                    onClick={() => deleteBook(id)}
                >
                    Deletar
                </Button>
            </Container>
        </div>
    );
}

export default Card;