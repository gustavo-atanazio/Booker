import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import styles from './Header.module.scss';

function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <h1>Booker</h1>

            <Button type='button'
                style={{
                    width: '50%',
                    maxWidth: 250,
                    fontSize: 20,
                    border: '2px solid #FFF',
                    transition: '0.3s'
                }}
                onClick={() => navigate(pathname === '/' ? '/novo-livro' : '/')}
            >
                {pathname === '/' ? 'Criar novo' : 'Voltar'}
            </Button>
        </header>
    );
}

export default Header;