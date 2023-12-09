import Form from 'components/Form';
import styles from './NewBook.module.scss';

function NewBook() {
    return (
        <section className={styles.new_book}>
            <h2>Adicione um novo livro</h2>

            <Form/>
        </section>
    );
}

export default NewBook;