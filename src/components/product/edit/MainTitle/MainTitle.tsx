import { useState } from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import { useRouter } from 'next/router';
import putDashboards from '@/lib/editdashboard/putDashboards';
import ColorSelector from './ColorSelector';
import styles from './MainTitle.module.css';

export default function MainTitle() {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [title, setTitle] = useState('');
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  // 변경 버튼 누르면 대시보드가 수정되게해야됨.
  const handleEditClick = async () => {
    try {
      const data = await putDashboards({
        title,
        color: selectedColor,
      });
      // 확인용(url 업데이트후 확인 완료하면 삭제 예정)
      console.log('Dashboard updated:', data);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <form className={styles.title_container}>
      <div className={styles.header_section}>
        <div className={styles.header_top}>
          {/* {item.title}로 가져올 예정 */}
          <h1 className={styles.title}>비브리지</h1>
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
    </form>
  );
}
