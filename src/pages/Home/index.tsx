import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import Container from 'components/Container';
import Card from 'components/Card';
import Button from 'components/Button';

import { useBooksContext } from 'context/Books';
import { useModalContext } from 'context/Modal';

import styles from './Home.module.scss';

function Home() {
    const navigate = useNavigate();
    const { books } = useBooksContext();
    const { isOpen } = useModalContext();

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

            <Modal isOpen={isOpen}>
                <p>Teste</p>
            </Modal>
        </section>
    );
}

export default Home;