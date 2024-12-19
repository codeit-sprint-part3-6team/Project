import Sidebar from '@/components/common/sidebar/Sidebar';
import MyPageMain from '@/components/product/mypage/Main';
import Navbar from '@/components/common/navbar/Navbar';
import styles from './index.module.css';

export default function MyPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.space}>
        <Navbar />
        <div className={styles.box}>
          <MyPageMain />
        </div>
      </div>
    </div>
  );
}
