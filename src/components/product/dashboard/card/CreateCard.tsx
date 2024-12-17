import React from 'react';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import DeadlineInput from '@/components/common/input/info-input/DeadlineInput';
import CDSButton from '@/components/common/button/CDSButton';
import ProfileImageInput from '../../mypage/ProfileImageInput';
import styles from './CreateCard.module.css';
import CardImageInput from './CardImageInput';

interface CreateCardProps {
  onClose: () => void;
}

export default function CreateCard({ onClose }: CreateCardProps) {
  const handleClick = () => {};
  const handleCancelClick = () => {
    onClose();
  };
  return (
    <OverlayContainer>
      <div className={styles.container}>
        <div className={styles[`scrollable-content`]}>
          <section className={styles.section}>
            <p className={styles.title}>할 일 생성</p>
          </section>
          <section className={styles.section}>
            <p className={styles.topic}>담당자</p>
            <input
              type="text"
              placeholder="이름을 입력해 주세요."
              className={styles[`name-select`]}
            />
            <div id="comboOptions">
              <div>옵션 1</div>
              <div>옵션 2</div>
              <div>옵션 3</div>
              <div>옵션 4</div>
            </div>
          </section>
          <section className={styles.section}>
            <TitleTagInput
              label="제목"
              placeholder="제목을 입력해주세요."
              // value={title}
              // onChange={handleChange1}
              required
            />
          </section>
          <section className={styles.section}>
            <div className={styles[`topic-box`]}>
              <p className={styles.topic}>설명</p>
              <p className={styles.require}>*</p>
            </div>
            <textarea
              className={styles[`description-input`]}
              placeholder="설명을 입력해 주세요."
            />
          </section>
          <section className={styles.section}>
            <DeadlineInput />
          </section>
          <section className={styles.section}>
            <TitleTagInput
              label="태그"
              placeholder="입력 후 Enter"
              // value={tag}
              // onChange={handleChange2}
              required
            />
          </section>
          <section className={styles.section}>
            <p className={styles.topic}>이미지</p>
            <CardImageInput />
          </section>
          <section className={styles[`button-box`]}>
            <CDSButton btnType="modal" onClick={handleCancelClick}>
              취소
            </CDSButton>
            <CDSButton btnType="modal_colored" onClick={handleClick}>
              생성
            </CDSButton>
          </section>
        </div>
      </div>
    </OverlayContainer>
  );
}
