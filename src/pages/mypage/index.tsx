// import Sidebar from '@/components/common/sidebar/Sidebar';
import MyPageMain from '@/components/product/mypage/Main';
import styles from './index.module.css';

export default function MyPage() {
  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}
      <div>사이드바</div>
      <div>
        {/* 여기 네비바 */}
        <MyPageMain />
      </div>
    </div>
  );
}
