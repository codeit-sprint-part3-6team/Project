import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getDashboards from '@/lib/mydashboard/getDashboard';
import postDashboards from '@/lib/mydashboard/postDashboard';
import CDSButton from '@/components/common/button/CDSButton';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import useSidebarDashboards from '@/hooks/useSidebar';
import { Dashboard } from '@/type/dashboard';
import { BadgeColor } from '@/type/button';
import { toast } from 'react-toastify';
import styles from './DashboardList.module.css';

export default function DashboardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7ac555');
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 5;

  const { fetchSidebarDashboards } = useSidebarDashboards();

  const router = useRouter();

  const colors = ['#7ac555', '#760dde', '#ffa500', '#76a5ea', '#e876ea'];

  const handleClick = (dashboardId) => {
    router.push(`/dashboard/${dashboardId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedColor('#7ac555');
    setNewDashboardName('');
  };

  const fetchDashboards = async () => {
    setIsLoading(true);
    try {
      const response = await getDashboards({
        page: currentPage,
        size: pageSize,
        navigationMethod: 'pagination',
      });
      setDashboards(response.dashboards);
      setTotalPages(Math.ceil(response.totalCount / pageSize));
    } catch (error) {
      console.error('Error fetching dashboards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewDashboard = async () => {
    if (!newDashboardName.trim()) {
      toast.error('대시보드 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await postDashboards({
        title: newDashboardName,
        color: selectedColor,
      });
      await fetchDashboards();
      await fetchSidebarDashboards(currentPage);
      closeModal();
    } catch (error) {
      console.error('대시보드 생성 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, [currentPage]);

  return (
    <div className={styles['dashboard-container']}>
      <ul className={styles['dashboard-list']}>
        <li>
          <CDSButton btnType="dashboard_add" onClick={openModal}>
            새로운 대시보드
          </CDSButton>
        </li>

        {/* 스켈레톤 표시 */}
        {isLoading ? (
          Array.from({ length: pageSize }).map((_, index) => (
            <li key={`skeleton_${index}`} className={styles.dashboard}>
              <div
                className={`${styles.skeleton} ${styles['skeleton-card']}`}
              />
            </li>
          ))
        ) : Array.isArray(dashboards) && dashboards.length > 0 ? (
          dashboards.map((item) => (
            <li key={`DashboardList_${item.id}`} className={styles.dashboard}>
              <CDSButton
                btnType="dashboard_card"
                badge={item.color as BadgeColor}
                owner={item.createdByMe}
                onClick={() => handleClick(item.id)}
              >
                {item.title}
              </CDSButton>
            </li>
          ))
        ) : (
          <li className={styles['menu-list-dashboard']} />
        )}
      </ul>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
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
      )}

      {/* 모달창 */}
      {showModal && (
        <OverlayContainer onClose={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>새로운 대시보드</h2>
            <h3>대시보드 이름</h3>
            <input
              type="text"
              placeholder="대시보드 이름을 입력해주세요"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              className={styles['modal-input']}
              disabled={isLoading}
            />

            {/* 색상 선택 UI */}
            <div className={styles['color-picker']}>
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`${styles['color-circle']} ${
                    color === selectedColor ? styles['color-selected'] : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`색상 선택: ${color}`}
                />
              ))}
            </div>

            <div className={styles['modal-buttons']}>
              <CDSButton
                btnType="modal"
                onClick={closeModal}
                disabled={isLoading}
              >
                취소
              </CDSButton>
              <CDSButton
                btnType="modal_colored"
                onClick={handleNewDashboard}
                disabled={isLoading}
              >
                {isLoading ? '생성 중...' : '생성'}
              </CDSButton>
            </div>
          </div>
        </OverlayContainer>
      )}
    </div>
  );
}
