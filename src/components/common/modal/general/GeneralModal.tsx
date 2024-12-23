import Cancel from 'public/ic/ic_x.svg';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import CDSButton from '@/components/common/button/CDSButton';
import OverlayContainer from '../overlay-container/OverlayContainer';
import styles from './GeneralModal.module.css';

export interface GeneralModalProps {
  label: string;
  placeholder: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  cancelTitle: string;
  handleCancelClick: () => void;
  adaptTitle: string;
  handleAdaptClick: () => void;
}

export default function GeneralModal({
  label,
  placeholder,
  isOpen,
  onClose,
  title,
  inputValue,
  onInputChange,
  cancelTitle,
  handleCancelClick,
  adaptTitle,
  handleAdaptClick,
}: GeneralModalProps) {
  if (!isOpen) return null;

  return (
    <OverlayContainer>
      <div className={styles['modal-section']}>
        <div className={styles.top}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            <button
              type="button"
              className={styles['close-button']}
              onClick={onClose}
            >
              <Cancel className={styles['cancel-button']} />
            </button>
          </div>
        </div>
        <div className={styles.top}>
          <TitleTagInput
            label={label}
            placeholder={placeholder}
            value={inputValue} // 부모로부터 받은 값
            onChange={(e) => onInputChange(e.target.value)} // 부모로 값 전달
            required={false}
          />
        </div>
        <div className={styles.top}>
          <CDSButton btnType="modal" onClick={handleCancelClick}>
            {cancelTitle}
          </CDSButton>
          <span style={{ margin: '0 5px' }} />
          <CDSButton
            btnType="modal_colored"
            onClick={handleAdaptClick}
            disabled={inputValue === ''}
          >
            {adaptTitle}
          </CDSButton>
        </div>
      </div>
    </OverlayContainer>
  );
}
