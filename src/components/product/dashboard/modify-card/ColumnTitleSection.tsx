import React from 'react';
import ToggleButton from 'public/ic/ic_dropdown.svg';
import { Column } from '@/type/column';
import Chip from '@/components/common/chip/Chip';
import Check from 'public/ic/ic_grayCheck.svg';
import styles from './ColumnTitleSection.module.css';

interface ColumnTitleSectionProps {
  columns: { result: string; data: Column[] };
  selectedColumnTitle: string;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onSelectMember: (title: string, id: number) => void;
}

export default function ColumnTitleSection({
  columns,
  selectedColumnTitle,
  isDropdownOpen,
  onToggleDropdown,
  onSelectMember,
}: ColumnTitleSectionProps) {
  return (
    <section className={styles.section}>
      <p className={styles.topic}>상태</p>
      <div className={styles[`input-box`]}>
        {selectedColumnTitle ? (
          <div className={styles[`name-select`]}>
            <Chip chipType="status">
              <span className={styles.status}>{selectedColumnTitle}</span>
            </Chip>
          </div>
        ) : (
          <input
            type="text"
            value={selectedColumnTitle}
            disabled
            placeholder="상태를 선택해 주세요."
            className={styles[`name-select`]}
          />
        )}
        <ToggleButton
          className={styles[`toggle-button`]}
          width={26}
          height={26}
          onClick={onToggleDropdown}
        />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {columns.data.map(({ id, title }) => (
            <div
              key={id}
              className={styles.option}
              role="button"
              tabIndex={0}
              onClick={() => onSelectMember(title, id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectMember(title, id);
                }
              }}
            >
              <div className={styles.calculate}>
                {title === selectedColumnTitle ? (
                  <Check
                    className={styles['check-icon']}
                    width={22}
                    height={22}
                  />
                ) : (
                  <div className={styles.space} />
                )}
                <div className={styles['status-content']}>
                  <Chip chipType="status">
                    <span className={styles['status-select']}>{title}</span>
                  </Chip>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
