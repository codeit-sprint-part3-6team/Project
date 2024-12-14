import CDSButton from '../../button/CDSButton';
import styles from './AuthModal.module.css';

function AuthModal({ message, handleCancelClick }) {
  return (
    <div className={styles.authModal_section}>
      <p className={styles.message}>{message}</p>

      <CDSButton btnType="modal_single" onClick={handleCancelClick}>
        확인
      </CDSButton>
    </div>
  );
}

export default AuthModal;
