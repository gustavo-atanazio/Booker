import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

import NotFoundIMG from 'assets/img/not-found.svg?react';
import styles from './NotFound.module.scss';

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className={styles.not_found}>
            <div className={styles.img_container}>
                <NotFoundIMG/>
            </div>

            <p>Nada por aqui!</p>

            <Button type="button"
                onClick={() => navigate(-1)}
                style={{
                    maxWidth: 250,
                    border: '2px solid #3D5A80',
                    fontSize: '1.5rem',
                    transition: '0.3s'
                }}
            >
                Voltar
            </Button>
        </section>
    );
}

export default NotFound;