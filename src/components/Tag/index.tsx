import styles from './Tag.module.scss';

interface Props {
    text: string
    color: string
}

function Tag({ text, color }: Props) {
    return (
        <div style={{ backgroundColor: color }} className={styles.tag}>
            {text}
        </div>
    );
}

export default Tag;