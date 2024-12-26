import styles from '@/components/common/dropdown/Dropdown.module.css';
import useDropdown from '@/hooks/useDropdown';
import { MouseEvent, PropsWithChildren, useEffect, useRef } from 'react';

type Menu = {
  label: string;
  value: string;
};

interface DropdownProps {
  menus: Menu[];
  onMenuClick: (value: string) => void;
}

function Dropdown({
  children,
  menus,
  onMenuClick,
}: PropsWithChildren<DropdownProps>) {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const ref = useRef<HTMLDivElement | null>();

  const handleMenuClick = (value: string) => {
    onMenuClick(value);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (ref.current && !ref.current.contains(target)) closeDropdown();
    };

    document.addEventListener('click', (e) => handleClickOutside(e));
  }, [ref]);

  return (
    <div
      ref={ref}
      className={styles.dropdown}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={styles['btn-dropdown']}
        onClick={toggleDropdown}
      >
        {children}
      </button>
      {isOpen && (
        <ul className={styles['dropdown-menus']}>
          {menus.map(({ label, value }) => (
            <li key={`btn_${value}`}>
              <button
                type="button"
                className={styles['dropdown-menu']}
                onClick={() => handleMenuClick(value)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
