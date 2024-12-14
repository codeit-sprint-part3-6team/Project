import styles from './TitleTagInput.module.css';

export default function TitleTagInput({
  label,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <p className={styles['box-title']}>{label}</p>
        {required && <p className={styles['box-dot']}>*</p>}
      </div>
      <input
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder}
      />
    </section>
  );
}
