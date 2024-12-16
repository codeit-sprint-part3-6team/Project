import Sidebar from '@/components/common/sidebar/Sidebar';
import ReturnButton from '@/components/common/button/ReturnButton';
import MainTitle from '@/components/product/edit/MainTitle';
import MemberTitle from '@/components/product/edit/MemberTitle';
import InviteTitle from '@/components/product/edit/InviteTitle';
import CDSButton from '@/components/common/button/CDSButton';
import styles from './edit.module.css';

export default function EditPage() {
  // 대시보드 삭제 구현해야됨
  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <main className={styles.container}>
      <Sidebar />
      <div className={styles.main_container}>
        <ReturnButton />
        <div className={styles.main_section}>
          <MainTitle />
          <MemberTitle />
          <InviteTitle />
        </div>
        <div className={styles.button}>
          <CDSButton btnType="dashboard_delete" onClick={handleClick}>
            대시보드 삭제하기
          </CDSButton>
        </div>
      </div>
    </main>
  );
}
