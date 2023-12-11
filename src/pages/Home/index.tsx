import { useNavigate } from 'react-router-dom';
import Card from 'components/Card';
import { useBooksContext } from 'context/Books';
import styles from './Home.module.scss';

function Home() {
    const navigate = useNavigate();
    const { books } = useBooksContext();

    return (
        <section className={styles.home}>
            <h2>Meus livros</h2>

            <div className={styles.home__container}>
                {books.map(book => (
                    <Card key={book.id} {...book}/>
                ))}
            </div>

            <button onClick={() => navigate('/novo-livro')}>Criar novo</button>
        </section>
    );
}

export default Home;