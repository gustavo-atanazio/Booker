import Book from 'types/Book';
import styles from './Card.module.scss';

function Card({ img, title, autor }: Book) {
    return (
        <div className={styles.card}>
            <div>
                <img src={img} alt={`Capa do livro ${title}`}/>
            </div>

            <h4>{title}</h4>
            <span>{autor}</span>
        </div>
    );
}

export default Card;