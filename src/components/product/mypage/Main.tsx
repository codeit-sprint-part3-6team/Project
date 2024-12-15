import CDSButton from '@/components/common/button/CDSButton';
import clsx from 'clsx';
import Back from 'public/ic/ic_left.svg';
import Plus from 'public/ic/ic_imgplus.svg';
import styles from './Main.module.css';

export default function MyPageMain() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <section className={styles[`return-box`]}>
          <Back width={20} height={20} className={styles[`back-image`]} />
          <p className={styles.return}>돌아가기</p>
        </section>
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
        <section
          className={clsx(styles[`modify-profile`], styles[`bottom-box`])}
        >
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
      </div>
    </div>
  );
}
