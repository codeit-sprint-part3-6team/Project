import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from '@/components/common/sidebar/Sidebar.module.css';
import getDashboards from '@/lib/mydashboard/getDashboard';

export default function Sidebar() {
  const [menu, setMenu] = useState([]);

  const fetchDashboards = async () => {
    try {
      const response = await getDashboards('11-6', {
        page: 1,
        size: 10,
        cursorId: 0,
        navigationMethod: 'pagination',
      });

      const { dashboards } = response;
      const formattedDashboards = dashboards.map((dashboard) => ({
        id: dashboard.id,
        title: dashboard.title,
        color: dashboard.color,
        createdByMe: dashboard.createdByMe,
      }));

      setMenu(formattedDashboards);
    } catch (error) {
      console.error('대시보드 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchDashboards(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

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
        <div className={styles.menu_dashboard}>
          <span className={styles.menu_text}>Dash Boards</span>
          <button
            className={styles.add_button}
            onClick={() => alert('새 대시보드 추가 기능 구현 필요')}
            type="button"
          >
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
            <li key={item.id} className={styles.menu_list_dashboard}>
              <div className={styles.dashboard_item}>
                {/* 색깔 동그라미 */}
                <span
                  className={styles.color_circle}
                  style={{ backgroundColor: item.color }}
                />
                {/* 대시보드 이름 */}
                <span className={styles.dashboard_title}>{item.title}</span>
                {/* 내가 생성한 경우 왕관 표시 */}
                {item.createdByMe && (
                  <span className={styles.crown_icon}>
                    <Image
                      src="/ic/ic_crown.svg"
                      alt="왕관"
                      width={16}
                      height={16}
                    />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
