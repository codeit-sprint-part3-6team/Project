import { useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import putDashboards from '@/lib/editdashboard/putDashboards';
import ColorSelector from './ColorSelector';
import styles from './MainTitle.module.css';

interface MainTitleProps {
  dashboardtitle: string | null;
}

export default function MainTitle({ dashboardtitle }: MainTitleProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [title, setTitle] = useState(dashboardtitle);
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleEditClick = async () => {
    if (dashboardId) {
      try {
        const data = await putDashboards({
          title,
          color: selectedColor,
          dashboardId,
        });
        setTitle(data.title);
      } catch (error) {
        console.error('대시보드 수정 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className={styles.title_container}>
      <div className={styles.header_section}>
        <div className={styles.header_top}>
          <h1 className={styles.title}>{dashboardtitle}</h1>
          <div className={styles.sub_container}>
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
        <div className={styles.sheader_button}>
          <CDSButton btnType="auth" onClick={handleEditClick}>
            변경
          </CDSButton>
        </div>
      </div>
    </div>
  );
}
