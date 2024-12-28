import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/common/sidebar/Sidebar';
import ReturnButton from '@/components/common/button/ReturnButton';
import CDSButton from '@/components/common/button/CDSButton';
import MainTitle from '@/components/product/edit/MainTitle/MainTitle';
import MemberTitle from '@/components/product/edit/MemberTitle/MemberTitle';
import InviteTitle from '@/components/product/edit/InviteTitle/InviteTitle';
import deleteDashboard from '@/lib/editdashboard/deleteDashboards';
import getDashboards from '@/lib/mydashboard/getDashboard';
import Navbar from '@/components/common/navbar/Navbar';
import styles from './edit.module.css';

export default function EditPage() {
  const [dashboardTitle, setDashboardTitle] = useState<string | null>(null);
  const [dashboardColor, setDashboardColor] = useState<string | null>(null);
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  const handleDeleteClick = async () => {
    try {
      await deleteDashboard(dashboardId);
      router.push('/mydashboard');
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboards({
          page: 1,
          size: 10,
          navigationMethod: 'pagination',
        });
        const dashboard = data.dashboards.find((d) => d.id === dashboardId);
        if (dashboard) {
          setDashboardTitle(dashboard.title);
          setDashboardColor(dashboard.color);
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    if (dashboardId) {
      fetchDashboard();
    }
  }, [dashboardId]);

  if (!dashboardColor) {
    return null;
  }

  return (
    <main className={styles.container}>
      <Sidebar />
      <Navbar />
      <div className={styles['main-container']}>
        <ReturnButton />
        <div className={styles['main-section']}>
          <MainTitle
            dashboardtitle={dashboardTitle}
            dashboardColor={dashboardColor}
          />
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
