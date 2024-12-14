import React, { useState, useEffect } from 'react';
import styles from '@/components/common/sidebar/Sidebar.module.css';
import getDashboards from '@/lib/mydashboard/getDashboard';
import Logo from 'public/images/img_logo.svg';
import TextLogo from 'public/images/img_textlogo.svg';
import PlusBtn from 'public/ic/ic_plus.svg';
import CrownIcon from 'public/ic/ic_crown.svg';

export default function Sidebar() {
  const [menu, setMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cursorId, setCursorId] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        setIsLoading(true);
        const response = await getDashboards({
          page: currentPage,
          size: pageSize,
          cursorId: cursorId || 0,
          navigationMethod: 'pagination',
        });

        const { dashboards, totalCount, cursorId: newCursorId } = response;

        const formattedDashboards = dashboards.map(
          ({ id, title, color, createdByMe }) => ({
            id,
            title,
            color,
            createdByMe,
          }),
        );

        setMenu(formattedDashboards);
        setCursorId(newCursorId);
        setTotalPages(Math.ceil(totalCount / pageSize));
      } catch (error) {
        console.error('대시보드 데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboards();
  }, [currentPage, cursorId]);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Logo width={29} height={33} />
        <TextLogo width={80} height={22} />
      </div>

      <div className={styles.menu}>
        <div className={styles.menu_container}>
          <div className={styles.menu_dashboard}>
            <span className={styles.menu_text}>Dash Boards</span>
            <button
              className={styles.add_button}
              onClick={() => alert('새 대시보드 추가 기능 구현 필요')}
              type="button"
            >
              <PlusBtn width={20} height={20} />
            </button>
          </div>

          {/* 동적으로 렌더링되는 메뉴 */}
          <ul className={styles.menu_list}>
            {menu.map((item) => (
              <li key={item.id} className={styles.menu_list_dashboard}>
                <div className={styles.dashboard_item}>
                  <span
                    className={styles.color_circle}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={styles.dashboard_title}>{item.title}</span>
                  {item.createdByMe && (
                    <span className={styles.crown_icon}>
                      <CrownIcon width={16} height={16} />
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 페이지네이션 컨트롤 */}
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pagination_button}
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1 || isLoading}
          >
            이전
          </button>
          <span className={styles.page_info}>
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className={styles.pagination_button}
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages || isLoading}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
