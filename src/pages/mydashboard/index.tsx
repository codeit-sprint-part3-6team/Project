import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/common/sidebar/Sidebar';
import getDashboards from '@/lib/mydashboard/getDashboard';
import getInvitations from '@/lib/mydashboard/getInvitations';
import putInvitations from '@/lib/mydashboard/putInvitations'; // 초대 수락/거절 API
import styles from '@/pages/mydashboard/mydashboard.module.css';
import CDSButton from '@/components/common/button/CDSButton';
import SearchIcon from 'public/ic/ic_search.svg';

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
  const handleInvitation = async (action, invitationId) => {
    try {
      const inviteAccepted = action === 'accept';
      await putInvitations({
        invitationId,
        inviteAccepted,
      });
      alert(
        action === 'accept' ? '초대를 수락했습니다.' : '초대를 거절했습니다.',
      );

      // 성공 시 상태 업데이트
      setInvitations((prev) =>
        action === 'accept'
          ? prev.map((invite) =>
              invite.id === invitationId
                ? { ...invite, inviteAccepted: true }
                : invite,
            )
          : prev.filter((invite) => invite.id !== invitationId),
      );
    } catch (error) {
      alert('초대 응답 처리 중 오류가 발생했습니다.');
    }
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
          <span>
            {totalPages} 페이지 중 {currentPage}
          </span>
          <CDSButton
            btnType="pagination_prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          <CDSButton
            btnType="pagination_next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>

      {/* 초대받은 대시보드 목록 */}
      <div className={styles['invitation-container']}>
        <div className={styles.head}>
          <h1 className={styles.title}>초대받은 대시보드</h1>
          <div className={styles['input-container']}>
            <SearchIcon width={24} height={24} />
            <input placeholder="검색" className={styles.input} />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr className={styles['table-head']}>
              <th className={styles['table-title']}>이름</th>
              <th className={styles['table-title']}>초대자</th>
              <th className={styles['table-title']}>수락 여부</th>
            </tr>
          </thead>

          <tbody>
            {invitations.map((invite) => (
              <tr key={invite.id} className={styles['table-body']}>
                <td className={styles['table-content']}>
                  {invite.dashboard.title}
                </td>
                <td className={styles['table-content']}>
                  {invite.inviter.nickname}
                </td>
                <td className={styles['invitation-btn']}>
                  {invite.inviteAccepted ? (
                    <span>수락됨</span>
                  ) : (
                    <>
                      <CDSButton
                        btnType="normal_colored"
                        onClick={() => handleInvitation('accept', invite.id)}
                      >
                        수락
                      </CDSButton>
                      <CDSButton
                        btnType="normal"
                        onClick={() => handleInvitation('reject', invite.id)}
                      >
                        거절
                      </CDSButton>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
