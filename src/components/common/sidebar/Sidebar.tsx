import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@/components/common/sidebar/Sidebar.module.css';

export default function Sidebar() {
  const [menu, setMenu] = useState([]);

  const addMenu = () => {
    const newMenu = {
      id: menu.length + 1,
      name: `${menu.length + 1}`,
      color: '#787486',
    };
    setMenu([...menu, newMenu]);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
          src="/images/img_logo.svg"
          alt="Taskify Logo"
          width={29}
          height={33}
        />
        <Image
          src="/images/img_textlogo.svg"
          alt="텍스트 로고"
          width={80}
          height={22}
        />
      </div>

      <div className={styles.menu}>
        <div className={styles.menu_item}>
          <span className={styles.menu_text}>Dash Boards</span>
          <button className={styles.add_button} onClick={addMenu} type="button">
            <Image
              src="/ic/ic_plus.svg"
              alt="추가 버튼"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* 동적으로 렌더링되는 메뉴 */}
        <ul className={styles.menu_list}>
          {menu.map((item) => (
            <li key={item.id} className={styles.menu_list_item}>
              <span style={{ color: item.color }}>{item.name}</span>
              {item.icon && (
                <span className={styles.menu_icon}>{item.icon}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
