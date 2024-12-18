import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Dashboard } from '@/type/dashboard';
import styles from '@/components/common/sidebar/Sidebar.module.css';
import useSidebarDashboards from '@/hooks/useSidebar';
import Logo from 'public/images/img_logo.svg';
import TextLogo from 'public/images/img_textlogo.svg';
import PlusBtn from 'public/ic/ic_plus.svg';
import CrownIcon from 'public/ic/ic_crown.svg';
import CDSButton from '../button/CDSButton';

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dashbaords, setDashboards] = useState<Dashboard[]>([]);

  const { isLoading, totalPages, fetchSidebarDashboards } =
    useSidebarDashboards();

  const sidebarDashboards = useSelector(
    (state: RootState) => state.dashboard.sidebarDashboards,
  );

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchSidebarDashboards(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setDashboards(sidebarDashboards);
  }, [sidebarDashboards]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Logo width={29} height={33} />
        <TextLogo width={80} height={22} />
      </div>

      <div className={styles.menu}>
        <div className={styles['menu-container']}>
          <div className={styles['menu-dashboard']}>
            <span className={styles['menu-text']}>Dash Boards</span>
            <button
              className={styles['add-button']}
              onClick={() => alert('새 대시보드 추가 기능 구현 필요')}
              type="button"
            >
              <PlusBtn width={20} height={20} />
            </button>
          </div>

          {/* 동적으로 렌더링되는 메뉴 */}
          {dashbaords && dashbaords.length > 0 ? (
            <ul className={styles['menu-list']}>
              {dashbaords.map((item) => (
                <li
                  key={`Sidebar_${item.id}`}
                  className={styles['menu-list-dashboard']}
                >
                  <div className={styles['dashboard-item']}>
                    <span
                      className={styles['color-circle']}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={styles['dashboard-title']}>
                      {item.title}
                    </span>
                    {item.createdByMe && (
                      <span className={styles['crown-icon']}>
                        <CrownIcon width={16} height={16} />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <span>대시보드가 없습니다.</span>
          )}
        </div>

        {/* 페이지네이션 컨트롤 */}
        <div className={styles.pagination}>
          <CDSButton
            btnType="pagination_prev"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1 || isLoading}
          />
          <CDSButton
            btnType="pagination_next"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages || isLoading}
          />
        </div>
      </div>
    </div>
  );
}
