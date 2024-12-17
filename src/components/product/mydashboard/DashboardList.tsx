import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getDashboards from '@/lib/mydashboard/getDashboard';
import CDSButton from '@/components/common/button/CDSButton';
import styles from './DashboardList.module.css';

export default function DashboardList() {
  const [dashboards, setDashboards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  // 대시보드 클릭 이벤트
  const handleClick = (dashboardId) => {
    router.push(`/dashboards/${dashboardId}`);
  };

  // 페이지네이션 변경 이벤트
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    // 대시보드 데이터 불러오기
    const fetchDashboards = async () => {
      const response = await getDashboards({
        page: currentPage,
        size: 5,
        navigationMethod: 'pagination',
      });
      setDashboards(response.dashboards);
      setTotalPages(Math.ceil(response.totalCount / 5));
    };

    fetchDashboards();
  }, [currentPage]);
  return (
    <div className={styles['dashboard-container']}>
      {/* 대시보드 목록 */}
      <ul className={styles['dashboard-list']}>
        <CDSButton btnType="dashboard_add" onClick={() => handleClick('new')}>
          새로운 대시보드
        </CDSButton>
        {dashboards.map((item) => (
          <li key={item.id} className={styles.dashboard}>
            <CDSButton
              btnType="dashboard_card"
              badge={item.color}
              owner={item.createdByMe}
              onClick={() => handleClick(item.id)}
            >
              {item.title}
            </CDSButton>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <span className={styles['pagination-text']}>
          {totalPages} 페이지 중 {currentPage}
        </span>
        <div>
          <CDSButton
            btnType="pagination_prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <CDSButton
            btnType="pagination_next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
}
