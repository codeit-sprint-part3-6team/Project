import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NavButton from '../button/NavButton';
import UserProfile from '../userprofile/UserProfile';
import InvitedMember from '../invitedmember/InvitedMember';
import { getDashboard, getMember } from '@/lib/navbar/getNavbar';
import Dropdown from '../dropdown/Dropdown';

function Navbar() {
  const [dashboardData, setDashboardData] = useState(null);
  const [invitedMember, setInvitedMember] = useState([]);
  const user = useSelector((state: RootState) => state.userInfo.user);
  const [clientUser, setClientUser] = useState(null);
  const router = useRouter();

  const isMyDashboard = router.pathname !== '/mydashboard';
  const isMyPage = router.pathname !== '/mypage';
  const isEdit = router.pathname !== '/edit';

  useEffect(() => {
    setClientUser(user);
  }, [user]);

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    const fetchDashboardData = async () => {
      const memberData = await getMember(router.query.id);
      setInvitedMember(memberData);

      const dashboardData = await getDashboard(router.query.id);
      setDashboardData(dashboardData);
    };

    fetchDashboardData();
  }, [router.query.id]);

  const renderTitle = () => {
    if (!isMyPage) return <h3 className={styles.title}>계정관리</h3>;
    if (!isMyDashboard) return <h3 className={styles.title}>내 대시보드</h3>;

    return (
      <h3
        className={`${styles.title} ${dashboardData?.createdByMe && `${styles.createdByMe}`}`}
      >
        {dashboardData?.title}
      </h3>
    );
  };

  const handleDropdownClick = (value: string) => {
    if (value === 'mypage') {
      router.push('/mypage');
    } else if (value === 'logout') {
      sessionStorage.removeItem('accessToken');
      router.push('/');
    }
  };

  return (
    <div className={styles.navbar}>
      {renderTitle()}

      <div className={styles['right-nav']}>
        {isMyDashboard && isMyPage && (
          <div className={styles['left-section']}>
            {isEdit && (
              <NavButton
                btnType="management"
                buttonName="관리"
                onClick={() =>
                  router.push(`/dashboards/${router.query.id}/edit`)
                }
              />
            )}

            <NavButton
              btnType="invite"
              buttonName="초대하기"
              onClick={() => alert('초대하기')}
            />

            <InvitedMember invitedMember={invitedMember} />
          </div>
        )}

        <div className={styles.dropdown}>
          <Dropdown
            onMenuClick={handleDropdownClick}
            menus={[
              { label: '마이페이지', value: 'mypage' },
              { label: '로그아웃', value: 'logout' },
            ]}
          >
            {clientUser && (
              <UserProfile
                type="header"
                nickname={clientUser.nickname}
                profileImageUrl={clientUser.profileImageUrl}
              />
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
