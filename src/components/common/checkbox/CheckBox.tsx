import styles from './CheckBox.module.css';
import { ChangeEvent } from 'react';

type CheckBoxProps = {
  name: string;
  id: string;
  htmlFor: string;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function CheckBox({ name, id, htmlFor, text, onChange }: CheckBoxProps) {
  return (
    <div className={styles['check-field']}>
      <input
        name={name}
        id={id}
        type="checkbox"
        onChange={onChange}
        className={styles['input-checkbox']}
      />
      <label htmlFor={htmlFor} className={styles.text}>
        {text}
      </label>
    </div>
  );
}

export default CheckBox;
