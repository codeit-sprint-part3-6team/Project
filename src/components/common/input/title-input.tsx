import { useState } from 'react';
import styles from './title-input.module.css';

export default function TitleInput() {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <p className={styles[`box-title`]}>제목</p>
        <p className={styles[`box-dot`]}>*</p>
      </div>
      <input
        value={title}
        onChange={handleChange}
        className={styles.input}
        placeholder="제목을 입력해주세요."
      />
    </section>
  );
}
