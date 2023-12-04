import { IoMdMenu } from 'react-icons/io';
import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <h1>Booker</h1>

            <IoMdMenu size={35}/>
        </header>
    );
}

export default Header;