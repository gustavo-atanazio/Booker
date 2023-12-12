import Placeholder from 'assets/img/img-placeholder.svg?react';
import TagsContainer from 'components/TagsContainer';
import Tag from 'components/Tag';

import IBook from 'types/IBook';
import styles from './Card.module.scss';

function Card({ img, title, author, tags }: IBook) {
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

            <TagsContainer>
                {tags.map(tag => (
                    <Tag
                        backgroundColor={tag.backgroundColor}
                        color={tag.color}
                        text={tag.text}
                        disabled={true}
                        key={tag.id}
                    />
                ))}
            </TagsContainer>
        </div>
    );
}

export default Card;