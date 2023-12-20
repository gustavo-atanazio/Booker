import { CSSProperties } from 'react';
import styles from './Button.module.scss';

interface Props {
    type: 'button' | 'submit' | 'reset'
    children: React.ReactNode
    style?: CSSProperties
    onClick?: () => void
}

function Button({ type, children, style = {}, onClick = () => {} }: Props) {
    return (
        <button
            type={type}
            style={style}
            className={styles.button}
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
}

export default Button;