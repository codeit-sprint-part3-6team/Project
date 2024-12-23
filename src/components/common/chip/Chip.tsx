import clsx from 'clsx';
import { ChipProps } from '@/type/chip';
import { PropsWithChildren } from 'react';
import styles from './Chip.module.css';
// import getTagColor from './helper';

/**
 * Chip 컴포넌트
 * - 다양한 유형의 Chip을 렌더링하는 공통 컴포넌트.
 * - chipType(['tag', 'status', 'status-option'])에 따라 스타일과 Dot 렌더링 여부를 결정합니다.
 *
 * @param {string} props.chipType - Chip의 타입을 지정
 * @param {React.ReactNode} props.children - Chip 내부에 렌더링할 내용
 * @returns {JSX.Element} Chip 컴포넌트의
 */
function Chip({ children, chipType, color }: PropsWithChildren<ChipProps>) {
  /**
   * renderDot: status인 타입인 경우 점을 렌더링
   * - 조건: chipType.startsWith('status') -> status | status-option
   * @returns {JSX.Element} - 점 span 태그
   */
  const renderDot = () =>
    chipType.startsWith('status') && <span className={styles.dot} />;

  const className = clsx(styles[chipType], chipType === 'tag' && styles[color]);

  return (
    <span className={className}>
      {renderDot()}
      {children}
    </span>
  );
}

export default Chip;
