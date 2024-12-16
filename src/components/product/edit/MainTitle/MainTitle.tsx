import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { style } from '@mui/system';
import TitleTagInput from '@/components/common/input/TitleTagInput';
import CDSButton from '@/components/common/button/CDSButton';
import ColorSelector from './ColorSelector';
import styles from './MainTitle.module.css';

export default function MainTitle() {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [title, setTitle] = useState('');

  const handleChange1 = (e) => {
    setTitle(e.target.value);
  };

  // 변경 버튼 누르면 대시보드가 수정되게해야됨.
  const handleClick = (e) => {
    console.log(e);
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
              onChange={handleChange1}
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
          <CDSButton btnType="auth" onClick={handleClick}>
            변경
          </CDSButton>
        </div>
      </div>
    </form>
  );
}
