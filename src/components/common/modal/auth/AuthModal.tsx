import CDSButton from '../../button/CDSButton';
import OverlayContainer from '../overlay-container/OverlayContainer';
import styles from './AuthModal.module.css';

function AuthModal({ message, handleCancelClick }) {
  return (
    <OverlayContainer>
      <div className={styles['authModal-section']}>
        <p className={styles.message}>{message}</p>

        <CDSButton btnType="modal_single" onClick={handleCancelClick}>
          확인
        </CDSButton>
      </div>
    </OverlayContainer>
  );
}

export default AuthModal;
