import styles from './TagInput.module.css';

export default function TagInput() {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <p className={styles[`box-title`]}>태그</p>
        <p className={styles[`box-dot`]}>*</p>
      </div>
      <input className={styles.input} placeholder="입력 후 Enter" />
    </section>
  );
}
