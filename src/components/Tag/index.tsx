import styles from './Tag.module.scss';

interface Props {
    text: string
    color: string
    id?: string
    select?: (id: string) => void
    disabled?: boolean
}

function Tag({ text, color, id, select, disabled = false }: Props) {
    return (
        <button
            style={{ backgroundColor: color }}
            className={styles.tag} type='button'
            onClick={() => (id && select) && select(id)}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Tag;