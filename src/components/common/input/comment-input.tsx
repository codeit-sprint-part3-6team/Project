import { useState } from 'react';
import styles from './comment-input.module.css';

export default function CommentInput() {
  const [content, setContent] = useState('');

  const handleSubmit = () => {};

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className={styles[`input-title`]}>댓글</p>
      <section className={styles[`input-section`]}>
        <textarea
          value={content}
          onChange={handleChange}
          className={styles.input}
          placeholder="댓글 작성하기"
        />
        {/* 버튼 컴포넌트로 대체 */}
        <button type="submit" className={styles.button}>
          입력
        </button>
      </section>
    </form>
  );
}
