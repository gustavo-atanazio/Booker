import { useNavigate } from 'react-router-dom';

import Container from 'components/Container';
import Card from 'components/Card';
import Button from 'components/Button';

import { useBooksContext } from 'context/Books';
import styles from './Home.module.scss';

function Home() {
    const navigate = useNavigate();
    const { books } = useBooksContext();

    return (
        <section className={styles.home}>
            <h2>Meus livros</h2>

            <Container display='grid'>
                {books.map(book => (
                    <Card key={book.id} {...book}/>
                ))}
            </Container>

            <Button
                type='button'
                backgroundColor='#3D5A80'
                color='#FFF'
                width='50%'
                fontSize={20}
                onClick={() => navigate('/novo-livro')}
            >
                Criar novo
            </Button>
        </section>
    );
}

export default Home;