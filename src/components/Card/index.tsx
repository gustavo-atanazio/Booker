import { memo } from 'react';

import Container from 'components/Container';
import Tag from 'components/Tag';
import Button from 'components/Button';

import { useBooksContext } from 'context/Books';
import { useModalContext } from 'context/Modal';
import IBook from 'types/IBook';

import Placeholder from 'assets/img/img-placeholder.svg?react';
import styles from './Card.module.scss';

function Card({ img, title, author, tags, id }: IBook) {
    const { deleteBook } = useBooksContext();
    const { showModal } = useModalContext();

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
                <Button type='button'
                    style={{
                        backgroundColor: '#777',
                        color: '#FFF',
                        padding: '0.5rem 1rem',
                        letterSpacing: 1
                    }}
                    onClick={() => showModal({ img, title, author, tags, id })}
                >
                    Editar
                </Button>
                
                <Button type='button'
                    style={{
                        backgroundColor: '#E71010',
                        color: '#FFF',
                        padding: '0.5rem 1rem',
                        letterSpacing: 1
                    }}
                    onClick={() => deleteBook(id)}
                >
                    Deletar
                </Button>
            </Container>
        </div>
    );
}

export default memo(Card);