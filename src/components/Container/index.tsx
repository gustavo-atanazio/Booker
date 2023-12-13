import styles from './Container.module.scss';

interface Props {
    display: 'flex' | 'grid'
    children: React.ReactNode
}

function Container({ display, children }: Props) {
    return (
        <div className={display === 'flex' ? styles.flex : styles.grid}>
            {children}
        </div>
    );
}

export default Container;