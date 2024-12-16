import { useState } from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import clsx from 'clsx';
import styles from './ChangePassword.module.css';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleBlur = () => {
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError(null);
    }
  };

  const isFormValid = password && newPassword && confirmPassword && !error;

  return (
    <section className={clsx(styles[`modify-profile`], styles[`bottom-box`])}>
      <p className={styles.title}>비밀번호 변경</p>
      <div>
        <p className={styles[`sub-title`]}>현재 비밀번호</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="비밀번호 입력"
        />
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호</p>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
          placeholder="새 비밀번호 입력"
          onBlur={handleBlur}
        />
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호 확인</p>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={clsx(
            styles.input,
            error ? styles['error-input'] : styles[`bottom-input`],
            error ? styles['error-margin'] : '',
          )}
          placeholder="새 비밀번호 입력"
          onBlur={handleBlur}
        />
        {error && <p className={styles['error-message']}>{error}</p>}
      </div>
      <div>
        <CDSButton btnType="profile_save" disabled={!isFormValid}>
          변경
        </CDSButton>
      </div>
    </section>
  );
}
