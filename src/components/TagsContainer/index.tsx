import styles from './TagsContainer.module.scss';

function TagsContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.tags_container}>
            {children}
        </div>
    );
}

export default TagsContainer;