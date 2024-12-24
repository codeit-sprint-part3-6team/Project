import React from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import styles from './ModifyButtonSection.module.css';

interface ModifyButtonSectionProps {
  onCancel: () => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

export default function ModifyButtonSection({
  onCancel,
  onSubmit,
  isDisabled,
}: ModifyButtonSectionProps) {
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
        수정
      </CDSButton>
    </section>
  );
}
