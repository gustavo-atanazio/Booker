import { useMemo } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

import Container from 'components/Container';
import Card from 'components/Card';
import Form from 'components/Form';

import { useBooksContext } from 'context/Books';
import { useModalContext } from 'context/Modal';

import Empty from 'assets/img/empty.svg?react';
import styles from './Home.module.scss';

Modal.setAppElement('#root');

function Home() {
    const { books } = useBooksContext();
    const { isOpen, closeModal, data } = useModalContext();
    const closeIcon = useMemo(() => {
        return <AiOutlineClose size={25} onClick={() => closeModal()} cursor='pointer'/>;
    }, []);

    return (
        <>
            <section className={styles.home}>
                <h2>Meus livros</h2>

                {books.length === 0
                    ? (
                        <>
                            <div className={styles.empty_container}>
                                <Empty/>
                            </div>

                            <p className={styles.empty_text}>Nenhum livro por aqui</p>
                        </>
                    )

                    : (
                        <Container display='grid'>
                            {books.map(book => (
                                <Card key={book.id} {...book}/>
                            ))}
                        </Container>
                    )
                }
            </section>

            <Modal isOpen={isOpen} ariaHideApp={true}>
                <div className={styles.modal_header}>
                    <h2>O que deseja editar?</h2>

                    {closeIcon}
                </div>
                <hr/>

                <Form
                    submitText='Editar'
                    toastMessage='Livro editado com sucesso!'
                    bookID={data.id}
                />
            </Modal>
        </>
    );
}

export default Home;