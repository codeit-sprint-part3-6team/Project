import React from 'react';
import ToggleButton from 'public/ic/ic_dropdown.svg';
import { Column } from '@/type/column';
import Chip from '@/components/common/chip/Chip';
import styles from './ColumnTitleSection.module.css';

interface ColumnTitleSectionProps {
  columns: { result: string; data: Column[] }; // id와 title만 사용
  selectedColumnTitle: string; // 현재 선택된 타이틀

  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onSelectMember: (title: string) => void;
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
            <Chip chipType="status">{selectedColumnTitle}</Chip>
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
              onClick={() => onSelectMember(title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectMember(title);
                }
              }}
            >
              <Chip chipType="status">{title}</Chip>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
