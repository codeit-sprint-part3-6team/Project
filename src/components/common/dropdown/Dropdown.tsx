import styles from '@/components/common/dropdown/Dropdown.module.css';
import useDropdown from '@/hooks/useDropDown';
import { PropsWithChildren } from 'react';

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

  const handleMenuClick = (value: string) => {
    onMenuClick(value);
    closeDropdown();
  };

  return (
    <div className={styles.dropdown}>
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
