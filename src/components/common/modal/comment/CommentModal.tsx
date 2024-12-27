import CDSButton from '../../button/CDSButton';
import OverlayContainer from '../overlay-container/OverlayContainer';
import styles from './CommentModal.module.css';

function CommentModal({ message, handleCancelClick, handleConfirmClick }) {
  return (
    <OverlayContainer>
      <div className={styles['comment-modal']}>
        <p className={styles.message}>{message}</p>

        <div>
          <CDSButton btnType="modal" onClick={handleCancelClick}>
            취소
          </CDSButton>
          <span style={{ margin: '0 5px' }} />
          <CDSButton btnType="modal_colored" onClick={handleConfirmClick}>
            확인
          </CDSButton>
        </div>
      </div>
    </OverlayContainer>
  );
}

export default CommentModal;
