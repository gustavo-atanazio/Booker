import { InputHTMLAttributes } from 'react';
import styles from './InputField.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    setValue: React.Dispatch<React.SetStateAction<string>>
    label: string
};

function InputField({ type = 'text', setValue, label, required = false, ...props }: InputProps) {
    return (
        <div className={styles.input_field}>
            <label>{label}</label>

            <input
                type={type}
                onChange={event => setValue(event.target.value)}
                {...props}
            />
        </div>
    );
}

export default InputField;