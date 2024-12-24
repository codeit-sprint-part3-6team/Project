import Landingimage1 from 'public/images/img_landingimage1.svg';
import Textlogo from 'public/images/img_textlogo.svg';
import CDSButton from '@/components/common/button/CDSButton';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
import NavBar from './NavBar';

export default function Header() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/signin');
  };

  return (
    <header className={styles['header-container']}>
      <NavBar />
      <div className={styles['header-section']}>
        <Landingimage1 className={styles['header-image']} />
        <div className={styles['header-title']}>
          <div className={styles.title}>새로운 일정 관리</div>
          <Textlogo className={styles.textlogo} />
        </div>
        <div className={styles['header-button']}>
          <CDSButton btnType="modal_colored" onClick={handleClick}>
            로그인하기
          </CDSButton>
        </div>
      </div>
    </header>
  );
}
