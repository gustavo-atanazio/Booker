import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

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
    const { isOpen, data, closeModal } = useModalContext();

    return (
        <>
            <section className={styles.home}>
                <h2>Meus livros</h2>

                <Container display='grid'>
                    {books.map(book => (
                        <Card key={book.id} {...book}/>
                    ))}
                </Container>

                <Button type='button'
                    style={{
                        width: '50%',
                        maxWidth: 250,
                        fontSize: 20
                    }}
                    onClick={() => navigate('/novo-livro')}
                >
                    Criar novo
                </Button>
            </section>

            <Modal isOpen={isOpen} ariaHideApp={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 1rem 0.5rem' }}>
                    <h2>O que deseja editar?</h2>

                    <AiOutlineClose size={25} onClick={() => closeModal()} cursor='pointer'/>
                </div>
                <hr/>

                <ModalForm bookTags={data.tags.map(tag => tag.id)} {...data}/>
            </Modal>
        </>
    );
}

export default Home;