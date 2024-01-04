import { useNavigate } from 'react-router-dom';

import Form from 'components/Form';
import Button from 'components/Button';

import styles from './NewBook.module.scss';

function NewBook() {
    const navigate = useNavigate();

    return (
        <section className={styles.new_book}>
            <h2>Adicione um novo livro</h2>

            <Form submitText='Criar' toastMessage='Livro criado com sucesso!'/>

            <Button type='button'
                style={{
                    backgroundColor: '#3D5A80',
                    color: '#FFF',
                    padding: '1rem 2rem',
                    fontSize: 20,
                    width: '50%',
                    maxWidth: 250
                }}
                onClick={() => navigate('/')}
            >
                Voltar
            </Button>
        </section>
    );
}

export default NewBook;