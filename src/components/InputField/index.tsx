import styles from './InputField.module.scss';

interface Props {
    type: 'text' | 'number' | 'color' | 'date' | 'datetime-local' | 'email' | 'password' | 'tel' | 'time'
    label: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    placeholder?: string
    required?: boolean
}

function InputField({ type, label, value, setValue, placeholder = '', required = false }: Props) {
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