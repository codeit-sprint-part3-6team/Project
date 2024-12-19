import Sidebar from '@/components/common/sidebar/Sidebar';
import MyPageMain from '@/components/product/mypage/Main';
import NavBar from '@/components/product/landing/NavBar';
import styles from './index.module.css';

export default function MyPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.space}>
        <NavBar />
        <MyPageMain />
      </div>
    </div>
  );
}
