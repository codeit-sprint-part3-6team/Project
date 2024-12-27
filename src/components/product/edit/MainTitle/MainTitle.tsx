import { useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import putDashboards from '@/lib/editdashboard/putDashboards';
import { toast } from 'react-toastify';
import useSidebarDashboards from '@/hooks/useSidebar';
import ColorSelector from './ColorSelector';
import styles from './MainTitle.module.css';

function EditConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-section']}>
        <h3>제목 또는 색상을 변경하시겠습니까?</h3>
        <div className={styles['modal-button']}>
          <button onClick={onClose} className={styles['cancel-button']}>
            취소
          </button>
          <button onClick={onConfirm} className={styles['confirm-button']}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

interface MainTitleProps {
  dashboardtitle: string | null;
  dashboardColor: string | null;
}

export default function MainTitle({
  dashboardtitle,
  dashboardColor,
}: MainTitleProps) {
  const [selectedColor, setSelectedColor] = useState<string>(dashboardColor);
  const [title, setTitle] = useState(dashboardtitle || '');
  const [newTitle, setNewTitle] = useState(dashboardtitle || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dashboardId = Number(router.query.id);
  const { fetchSidebarDashboards } = useSidebarDashboards();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmEdit = async () => {
    try {
      const updatedDashboard = await putDashboards({
        title,
        color: selectedColor,
        dashboardId,
      });
      setNewTitle(updatedDashboard.title);
      setTitle(updatedDashboard.title);
      setSelectedColor(updatedDashboard.color);
      toast.success('변경 사항이 저장되었습니다.');
      fetchSidebarDashboards(1);
    } catch (error) {
      toast.error('변경에 실패했습니다.');
      throw new Error(`${error}`);
    } finally {
      closeModal();
    }
  };

  return (
    <div className={styles['title-container']}>
      <div className={styles['header-section']}>
        <div className={styles['header-top']}>
          <h1 className={styles.title}>
            {newTitle && newTitle.length > 10
              ? `${newTitle.slice(0, 10)}...`
              : newTitle}
          </h1>
          <div className={styles['sub-container']}>
            <TitleTagInput
              label="대시보드 이름"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={handleChange}
              required
            />
            <ColorSelector
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              customStyle={styles.colorSelector}
            />
          </div>
        </div>
        <div className={styles['sheader-button']}>
          <CDSButton btnType="auth" onClick={handleEditClick}>
            변경
          </CDSButton>
        </div>
      </div>
      <EditConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmEdit}
      />
    </div>
  );
}
