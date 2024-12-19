import React from 'react';
import styles from './DescriptionInput.module.css';

interface DescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function DescriptionInput({
  value,
  onChange,
}: DescriptionInputProps) {
  return (
    <section className={styles.section}>
      <div className={styles['topic-box']}>
        <p className={styles.topic}>설명</p>
        <p className={styles.require}>*</p>
      </div>
      <textarea
        className={styles['description-input']}
        placeholder="설명을 입력해 주세요."
        value={value}
        onChange={onChange}
      />
    </section>
  );
}
