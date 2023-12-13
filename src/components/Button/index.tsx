import React from 'react';
import styles from './Button.module.scss';

interface Props {
    type: 'button' | 'submit' | 'reset'
    children: React.ReactNode
    backgroundColor: string
    color: string
    padding?: string | number
    width?: string | number
    maxWidth?: string | number
    fontSize?: string | number
}

function Button({
    type,
    children,
    backgroundColor,
    color,
    padding = '1rem 2rem',
    width = '100%',
    maxWidth = 250,
    fontSize = '1rem'
}: Props) {
    return (
        <button
            type={type}
            style={{ backgroundColor, color, padding, width, maxWidth, fontSize }}
            className={styles.button}
        >
            {children}
        </button>
    );
}

export default Button;