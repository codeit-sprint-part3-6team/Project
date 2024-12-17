import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getDashboards from '@/lib/mydashboard/getDashboard';
import postDashboards from '@/lib/mydashboard/postDashboard';
import CDSButton from '@/components/common/button/CDSButton';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import styles from './DashboardList.module.css';

export default function DashboardList() {
  const [dashboards, setDashboards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7ac555');
  const [isLoading, setIsLoading] = useState(false);

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
    const response = await getDashboards({
      page: currentPage,
      size: 5,
      navigationMethod: 'pagination',
    });
    setDashboards(response.dashboards);
    setTotalPages(Math.ceil(response.totalCount / 5));
  };

  const handleNewDashboard = async () => {
    if (!newDashboardName.trim()) {
      alert('대시보드 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      await postDashboards({
        title: newDashboardName,
        color: selectedColor,
      });
      closeModal();
      fetchDashboards();
    } catch (error) {
      alert(error.message || '대시보드 생성에 실패했습니다.');
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
        <CDSButton btnType="dashboard_add" onClick={openModal}>
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

      {/* 모달창 */}
      {showModal && (
        <OverlayContainer>
          <div className={styles.modal}>
            <h2>새로운 대시보드</h2>
            <h3>대시보드 이름</h3>
            <input
              type="text"
              placeholder="대시보드 이름"
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
