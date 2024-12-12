import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import generateClassNames from '@/utils/generateClassNames';
import { ButtonProps } from '@/type/button';
import styles from './Button.module.css';

/**
 * Button: 공통 버튼 컴포넌트
 * @param {ReactNode} children - 버튼 내부의 콘텐츠
 * @returns {JSX.Element} - 버튼 컴포넌트
 */
function Button({
  children,
  classes,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const classNames = generateClassNames(classes, styles);
  return (
    <button
      type="button"
      className={clsx(styles.button, classNames)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
