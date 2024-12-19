import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Dashboard } from '@/type/dashboard';
import styles from '@/components/common/sidebar/Sidebar.module.css';
import useSidebarDashboards from '@/hooks/useSidebar';
import Logo from 'public/images/img_logo.svg';
import TextLogo from 'public/images/img_textlogo.svg';
import PlusBtn from 'public/ic/ic_plus.svg';
import CrownIcon from 'public/ic/ic_crown.svg';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import postDashboards from '@/lib/mydashboard/postDashboard';
import CDSButton from '../button/CDSButton';

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7ac555');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    isLoading: isSidebarLoading,
    totalPages,
    fetchSidebarDashboards,
  } = useSidebarDashboards();

  const sidebarDashboards = useSelector(
    (state: RootState) => state.dashboard.sidebarDashboards,
  );

  const colors = ['#7ac555', '#760dde', '#ffa500', '#76a5ea', '#e876ea'];

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSelectedColor('#7ac555');
    setNewDashboardName('');
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
      await fetchSidebarDashboards(currentPage);
      closeModal();
    } catch (error) {
      console.error('대시보드 생성 실패:', error);
    } finally {
      setIsLoading(false);
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
      <Link href="/" className={styles.logo}>
        <Logo width={29} height={33} />
        <TextLogo width={80} height={22} />
      </Link>

      <div className={styles.menu}>
        <div className={styles['menu-container']}>
          <div className={styles['menu-dashboard']}>
            <span className={styles['menu-text']}>Dash Boards</span>
            <button
              className={styles['add-button']}
              onClick={openModal}
              type="button"
            >
              <PlusBtn width={20} height={20} />
            </button>
          </div>

          {dashboards && dashboards.length > 0 ? (
            <ul className={styles['menu-list']}>
              {dashboards.map((item) => {
                const isActive =
                  router.query.id && router.query.id === item.id.toString();
                return (
                  <li
                    key={`Sidebar_${item.id}`}
                    className={`${styles['menu-list-dashboard']} ${
                      isActive ? styles['menu-list-dashboard-active'] : ''
                    }`}
                  >
                    <Link href={`/dashboard/${item.id}`}>
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
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>대시보드가 없습니다.</span>
          )}
        </div>

        <div className={styles.pagination}>
          <CDSButton
            btnType="pagination_prev"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1 || isSidebarLoading}
          />
          <CDSButton
            btnType="pagination_next"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages || isSidebarLoading}
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
              placeholder="대시보드 이름을 입력해주세요"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              className={styles['modal-input']}
              disabled={isLoading}
            />

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
