import Sidebar from '@/components/common/sidebar/Sidebar';
import ReturnButton from '@/components/common/button/ReturnButton';
import CDSButton from '@/components/common/button/CDSButton';
import MainTitle from '@/components/product/edit/MainTitle/MainTitle';
import MemberTitle from '@/components/product/edit/MemberTitle/MemberTitle';
import InviteTitle from '@/components/product/edit/InviteTitle/InviteTitle';
import deleteDashboard from '@/lib/editdashboard/deleteDashboards';
import { useRouter } from 'next/router';
import styles from './edit.module.css';

export default function EditPage() {
  const router = useRouter();
  const dashboardId = router.query.id;

  // /dashboard/id/edit연결후 재확인
  const handleDeleteClick = async () => {
    try {
      await deleteDashboard(Number(dashboardId));
      router.push('/mydashboard');
    } catch (error) {
      throw new Error(`${error}`);
    }
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
          <CDSButton btnType="dashboard_delete" onClick={handleDeleteClick}>
            대시보드 삭제하기
          </CDSButton>
        </div>
      </div>
    </main>
  );
}
