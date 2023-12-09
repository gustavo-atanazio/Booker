import styles from './InputField.module.scss';

interface Props {
    type: string
    label: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    placeholder?: string
    required?: boolean
}

function InputField({ type, label, placeholder, required = false, value, setValue }: Props) {
    return (
        <div className={styles.input_field}>
            <label>{label}</label>

            <input
                type={type}
                value={value}
                onChange={event => setValue(event.target.value)}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

export default InputField;