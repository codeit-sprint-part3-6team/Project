import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/common/sidebar/Sidebar';
import ReturnButton from '@/components/common/button/ReturnButton';
import CDSButton from '@/components/common/button/CDSButton';
import MainTitle from '@/components/product/edit/MainTitle/MainTitle';
import MemberTitle from '@/components/product/edit/MemberTitle/MemberTitle';
import InviteTitle from '@/components/product/edit/InviteTitle/InviteTitle';
import deleteDashboard from '@/lib/editdashboard/deleteDashboards';
import getDashboards from '@/lib/mydashboard/getDashboard';
import Navbar from '@/components/common/navbar/Navbar';
import styles from './edit.module.css';

// 모달 컴포넌트
function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>정말 삭제하시겠습니까?</h3>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            예
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditPage() {
  const [dashboardTitle, setDashboardTitle] = useState<string | null>(null);
  const [dashboardColor, setDashboardColor] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  const handleDeleteClick = async () => {
    try {
      await deleteDashboard(dashboardId);
      router.push('/mydashboard');
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboards({
          page: 1,
          size: 10,
          navigationMethod: 'pagination',
        });
        const dashboard = data.dashboards.find((d) => d.id === dashboardId);
        if (dashboard) {
          setDashboardTitle(dashboard.title);
          setDashboardColor(dashboard.color);
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    if (dashboardId) {
      fetchDashboard();
    }
  }, [dashboardId]);

  if (!dashboardColor) {
    return null;
  }

  return (
    <main className={styles.container}>
      <Sidebar />
      <Navbar />
      <div className={styles['main-container']}>
        <ReturnButton />
        <div className={styles['main-section']}>
          <MainTitle
            dashboardtitle={dashboardTitle}
            dashboardColor={dashboardColor}
          />
          <MemberTitle />
          <InviteTitle />
        </div>
        <div className={styles.button}>
          <CDSButton btnType="dashboard_delete" onClick={openModal}>
            대시보드 삭제하기
          </CDSButton>
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          handleDeleteClick();
          closeModal();
        }}
      />
    </main>
  );
}
