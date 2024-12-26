import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import putDashboards from '@/lib/editdashboard/putDashboards';
import ColorSelector from './ColorSelector';
import styles from './MainTitle.module.css';
import { toast } from 'react-toastify';

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
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEditClick = async () => {
    try {
      const updatedTitle = await putDashboards({
        title,
        color: selectedColor,
        dashboardId,
      });
      setTitle(updatedTitle.title);
      toast.success('변경 사항이 저장되었습니다.');
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <div className={styles['title-container']}>
      <div className={styles['header-section']}>
        <div className={styles['header-top']}>
          <h1 className={styles.title}>
            {dashboardtitle && dashboardtitle.length > 10
              ? `${dashboardtitle.slice(0, 10)}...`
              : dashboardtitle}
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
    </div>
  );
}
