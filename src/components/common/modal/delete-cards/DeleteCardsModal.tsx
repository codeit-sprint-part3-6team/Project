import CDSButton from '../../button/CDSButton';
import styles from './DeleteCardsModal.module.css';

function DeleteCardsModal({ message, handleCancelClick, handleDeleteClick }) {
  return (
    <div className={styles.deleteCardsModal_section}>
      <p className={styles.message}>{message}</p>

      <div>
        <CDSButton btnType="modal" onClick={handleCancelClick}>
          취소
        </CDSButton>
        <span style={{ margin: '0 5px' }} />
        <CDSButton btnType="modal_colored" onClick={handleDeleteClick}>
          삭제
        </CDSButton>
      </div>
    </div>
  );
}

export default DeleteCardsModal;
