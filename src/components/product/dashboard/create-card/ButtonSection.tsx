import React from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import styles from './ButtonSection.module.css';

interface ButtonSectionProps {
  onCancel: () => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

export default function ButtonSection({
  onCancel,
  onSubmit,
  isDisabled,
}: ButtonSectionProps) {
  return (
    <section className={styles[`button-box`]}>
      <CDSButton btnType="modal" onClick={onCancel}>
        취소
      </CDSButton>
      <CDSButton
        btnType="modal_colored"
        onClick={onSubmit}
        disabled={isDisabled}
      >
        생성
      </CDSButton>
    </section>
  );
}
