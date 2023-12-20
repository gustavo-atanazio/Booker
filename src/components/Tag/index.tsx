import styles from './Tag.module.scss';

interface Props {
    text: string
    backgroundColor: string
    color?: string
    id?: string
    select?: (id: string) => void
    disabled?: boolean
    selected?: boolean
}

function Tag({
    text,
    backgroundColor,
    color = '#FFF',
    id,
    select,
    disabled = false,
    selected = false
}: Props) {
    return (
        <button
            style={{ backgroundColor, color, opacity: selected ? 0.5 : 1 }}
            className={styles.tag}
            type='button'
            onClick={() => (id && select) && select(id)}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Tag;