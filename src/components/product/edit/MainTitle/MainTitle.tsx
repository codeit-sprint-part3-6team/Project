import { useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import putDashboards from '@/lib/editdashboard/putDashboards';
import { toast } from 'react-toastify';
import useSidebarDashboards from '@/hooks/useSidebar';
import ColorSelector from './ColorSelector';
import styles from './MainTitle.module.css';

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
  const router = useRouter();
  const dashboardId = Number(router.query.id);
  const { fetchSidebarDashboards } = useSidebarDashboards();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
          <CDSButton btnType="auth" onClick={confirmEdit}>
            변경
          </CDSButton>
        </div>
      </div>
    </div>
  );
}
