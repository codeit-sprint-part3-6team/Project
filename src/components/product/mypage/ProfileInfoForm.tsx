// ProfileInfoForm.tsx
import React from 'react';
import clsx from 'clsx';
import styles from './ProfileInfoForm.module.css';

interface ProfileInfoFormProps {
  email: string;
  nickname: string;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileInfoForm({
  email,
  nickname,
  onNicknameChange,
}: ProfileInfoFormProps) {
  return (
    <div className={styles[`input-box`]}>
      <div>
        <p className={styles[`sub-title`]}>이메일</p>
        <input
          className={clsx(styles.input, styles[`email-input`])}
          readOnly
          value={email}
        />
      </div>
      <div>
        <p className={styles[`sub-title`]}>닉네임</p>
        <input
          name="nickname"
          value={nickname}
          onChange={onNicknameChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
