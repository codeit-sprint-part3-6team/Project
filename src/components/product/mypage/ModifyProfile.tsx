import Plus from 'public/ic/ic_imgplus.svg';
import CDSButton from '@/components/common/button/CDSButton';
import styles from './ModifyProfile.module.css';

export default function ModifyProfile() {
  return (
    <section className={styles[`modify-profile`]}>
      <p className={styles.title}>프로필</p>
      <div className={styles[`profile-box`]}>
        <div className={styles[`img-input-box`]}>
          <input className={styles[`img-input`]} />
          <Plus className={styles.plus} width={18} height={18} />
        </div>
        <div className={styles[`input-box`]}>
          <div>
            <p className={styles[`sub-title`]}>이메일</p>
            <input className={styles.input} />
          </div>
          <div>
            <p className={styles[`sub-title`]}>닉네임</p>
            <input className={styles.input} />
          </div>
          <div className={styles[`save-button`]}>
            <CDSButton btnType="profile_save">저장</CDSButton>
          </div>
        </div>
      </div>
    </section>
  );
}
