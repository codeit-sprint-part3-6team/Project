import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/common/sidebar/Sidebar';
import getDashboards from '@/lib/mydashboard/getDashboard';
import getInvitations from '@/lib/mydashboard/getInvitations';
import styles from '@/pages/mydashboard/mydashboard.module.css';
import CDSButton from '@/components/common/button/CDSButton';

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [invitations, setInvitations] = useState([]);
  const router = useRouter();

  // 대시보드 클릭 이벤트
  const handleClick = (dashboardId) => {
    router.push(`/dashboards/${dashboardId}`);
  };

  // 초대 수락/거절 이벤트
  const handleInvitationAction = (action, invitationId) => {
    console.log(`Invitation ID: ${invitationId}, Action: ${action}`);
    // 여기에서 API 호출로 수락/거절 동작을 구현하면 됩니다.
  };

  // 페이지네이션 변경 이벤트
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    // 대시보드 데이터 불러오기
    const fetchDashboards = async () => {
      const response = await getDashboards({
        page: currentPage,
        size: 5,
        navigationMethod: 'pagination',
      });
      setDashboards(response.dashboards);
      setTotalPages(Math.ceil(response.totalCount / 5));
    };

    fetchDashboards();
  }, [currentPage]);

  useEffect(() => {
    const fetchInvitations = async () => {
      const response = await getInvitations({
        size: 10,
      });
      setInvitations(response.invitations);
    };

    fetchInvitations();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles['dashboard-container']}>
        {/* 대시보드 목록 */}
        <ul className={styles['dashboard-list']}>
          <CDSButton btnType="dashboard_add" onClick={() => handleClick('new')}>
            새로운 대시보드
          </CDSButton>
          {dashboards.map((item) => (
            <li key={item.id} className={styles.dashboard}>
              <CDSButton
                btnType="dashboard_card"
                badge={item.color}
                onClick={() => handleClick(item.id)}
              >
                {item.title}
              </CDSButton>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles['page-button']}
          >
            이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles['page-button']}
          >
            다음
          </button>
        </div>
      </div>

      {/* 초대받은 대시보드 목록 */}
      <h1 className={styles.title}>초대받은 대시보드</h1>
      <div className={styles['invitation-container']}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>초대자</th>
              <th>수락 여부</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invite) => (
              <tr key={invite.id}>
                <td>{invite.dashboard.title}</td>
                <td>{invite.inviter.nickname}</td>
                <td>
                  <CDSButton btnType="normal_colored" onClick={handleClick}>
                    수락
                  </CDSButton>
                  <CDSButton btnType="normal" onClick={handleClick}>
                    거절
                  </CDSButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
