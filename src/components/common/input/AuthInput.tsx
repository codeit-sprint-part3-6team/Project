import { ChangeEvent, MouseEvent, useState } from 'react';
import styles from './AuthInput.module.css';
import Visibility from 'public/ic/ic_visibility.svg';
import InVisibility from 'public/ic/ic_invisibility.svg';

type AuthInputProps = {
  htmlFor: string;
  title: string;
  id: string;
  type: string | null;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
};

function AuthInput({
  htmlFor,
  title,
  type = 'text',
  id,
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
}: AuthInputProps) {
  const [isVisibleToggle, setIsVisibleToggle] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (isVisibleToggle ? 'text' : 'password') : type;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisibleToggle(!isVisibleToggle);
  };

  return (
    <div className={styles.authField}>
      <label className={styles.title} htmlFor={htmlFor}>
        {title}
      </label>

      <div className={`${styles.authInput} ${error ? styles.error : ''}`}>
        <input
          type={inputType}
          id={id}
          className={`${isPassword ? styles.password : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {isPassword && (
          <button onClick={handleClick}>
            {isVisibleToggle ? <Visibility /> : <InVisibility />}
          </button>
        )}

        {error && <span>{errorMessage}</span>}
      </div>
    </div>
  );
}

export default AuthInput;
