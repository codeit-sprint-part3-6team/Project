import styles from './TitleTagInput.module.css';

interface TitleTagInputProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required: boolean;
}

export default function TitleTagInput({
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  required = false,
}: TitleTagInputProps) {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <p className={styles['box-title']}>{label}</p>
        {required && <p className={styles['box-dot']}>*</p>}
      </div>
      <input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={styles.input}
        placeholder={placeholder}
      />
    </section>
  );
}
