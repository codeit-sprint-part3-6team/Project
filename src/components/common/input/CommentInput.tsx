import { useState } from 'react';
import CDSButton from '../button/CDSButton';
import styles from './CommentInput.module.css';

export default function CommentInput() {
  const [content, setContent] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className={styles.button}>
          <CDSButton btnType="edit">입력</CDSButton>
        </div>
      </section>
    </form>
  );
}
