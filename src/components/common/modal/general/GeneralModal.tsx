import Cancle from 'public/ic/ic_x.svg';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import CDSButton from '@/components/common/button/CDSButton';
import styles from './GeneralModal.module.css';

export interface GeneralModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  cancletitle: string;
  handleCancleClick: () => void;
  adapttitle: string;
  handleAdaptClick: () => void;
}

export default function GeneralModal({
  isOpen,
  onClose,
  title,
  inputValue,
  onInputChange,
  cancletitle,
  handleCancleClick,
  adapttitle,
  handleAdaptClick,
}: GeneralModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_section}>
        <div className={styles.top}>
          <div>
            <h1>{title}</h1>
            <button
              type="button"
              className={styles.close_button}
              onClick={onClose}
            >
              <Cancle className={styles.cancle_button} />
            </button>
          </div>
        </div>
        <div className={styles.top}>
          <TitleTagInput
            label="이름"
            placeholder="제목을 입력해주세요."
            value={inputValue} // 부모로부터 받은 값
            onChange={(e) => onInputChange(e.target.value)} // 부모로 값 전달
            required
          />
        </div>
        <div className={styles.top}>
          <CDSButton btnType="modal" onClick={handleCancleClick}>
            {cancletitle}
          </CDSButton>
          <span style={{ margin: '0 5px' }} />
          <CDSButton btnType="modal_colored" onClick={handleAdaptClick}>
            {adapttitle}
          </CDSButton>
        </div>
      </div>
    </div>
  );
}
