import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import Container from 'components/Container';
import Card from 'components/Card';
import Button from 'components/Button';
import ModalForm from './ModalForm';

import { useBooksContext } from 'context/Books';
import { useModalContext } from 'context/Modal';

import styles from './Home.module.scss';

function Home() {
    const navigate = useNavigate();
    const { books } = useBooksContext();
    const { isOpen, data } = useModalContext();

    return (
        <>
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

            <Modal isOpen={isOpen} ariaHideApp={false}>
                <h2>O que deseja editar?</h2>
                <hr/>

                <ModalForm bookTags={data.tags.map(tag => tag.id)} {...data}/>
            </Modal>
        </>
    );
}

export default Home;