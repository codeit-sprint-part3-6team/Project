import CDSButton from '@/components/common/button/CDSButton';
import clsx from 'clsx';
import styles from './ChangePassword.module.css';

export default function ChangePassword() {
  return (
    <section className={clsx(styles[`modify-profile`], styles[`bottom-box`])}>
      <p className={styles.title}>비밀번호 변경</p>
      <div>
        <p className={styles[`sub-title`]}>현재 비밀번호</p>
        <input className={styles.input} placeholder="비밀번호 입력" />
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호</p>
        <input className={styles.input} placeholder="새 비밀번호 입력" />
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호 확인</p>
        <input
          className={clsx(styles.input, styles[`bottom-input`])}
          placeholder="새 비밀번호 입력"
        />
      </div>
      <div>
        <CDSButton btnType="profile_save">변경</CDSButton>
      </div>
    </section>
  );
}
