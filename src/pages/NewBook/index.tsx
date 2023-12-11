import { useNavigate } from 'react-router-dom';
import Form from 'components/Form';
import styles from './NewBook.module.scss';

function NewBook() {
    const navigate = useNavigate();

    return (
        <section className={styles.new_book}>
            <h2>Adicione um novo livro</h2>

            <Form/>

            <button onClick={() => navigate('/')}>Voltar</button>
        </section>
    );
}

export default NewBook;