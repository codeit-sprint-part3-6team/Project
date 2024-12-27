import { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import Visibility from 'public/ic/ic_visibility.svg';
import InVisibility from 'public/ic/ic_invisibility.svg';
import styles from './AuthInput.module.css';

type AuthInputProps = {
  name: string;
  htmlFor: string;
  title: string;
  id: string;
  type: string | null;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  autoComplete: string;
};

function AuthInput({
  name,
  htmlFor,
  title,
  type = 'text',
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  errorMessage,
  autoComplete,
}: AuthInputProps) {
  const [isVisibleToggle, setIsVisibleToggle] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (isVisibleToggle ? 'text' : 'password') : type;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisibleToggle(!isVisibleToggle);
  };

  return (
    <div className={styles['auth-field']}>
      <label className={styles.title} htmlFor={htmlFor}>
        {title}
      </label>

      <div className={`${styles['auth-input']} ${error ? styles.error : ''}`}>
        <input
          name={name}
          type={inputType}
          id={id}
          className={`${isPassword ? styles.password : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
        />

        {isPassword && (
          <button type="button" onClick={handleClick}>
            {isVisibleToggle ? <Visibility /> : <InVisibility />}
          </button>
        )}
      </div>

      {error && <span className={styles['error-message']}>{errorMessage}</span>}
    </div>
  );
}

export default AuthInput;
