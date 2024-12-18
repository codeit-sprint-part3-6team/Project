import React from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import styles from './ButtonSection.module.css';

interface ButtonSectionProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export default function ButtonSection({
  onCancel,
  onSubmit,
}: ButtonSectionProps) {
  return (
    <section className={styles[`button-box`]}>
      <CDSButton btnType="modal" onClick={onCancel}>
        취소
      </CDSButton>
      <CDSButton btnType="modal_colored" onClick={onSubmit}>
        생성
      </CDSButton>
    </section>
  );
}
