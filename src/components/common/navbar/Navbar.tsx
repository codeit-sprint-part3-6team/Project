import Link from 'next/link';
import instance from '@/lib/instance';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NavButton from '../button/NavButton';
import UserProfile from '../userprofile/UserProfile';
import InvitedMember from '../invitedmember/InvitedMember';

function Navbar() {
  const [dashboardTitle, setDashboardTitle] = useState('');
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
      const membersResponse = await instance.get(
        `11-6/members?dashboardId=${router.query.id}`,
      );
      setInvitedMember(membersResponse.data.members);

      const titleResponse = await instance.get(
        `11-6/dashboards/${router.query.id}`,
      );
      setDashboardTitle(titleResponse.data.title);
    };

    fetchDashboardData();
  }, [router.query.id]);

  return (
    <div className={styles.navbar}>
      {!dashboardTitle ? (
        <h3 className={styles.title}>내 대시보드</h3>
      ) : (
        <h3 className={styles.title}>{dashboardTitle}</h3>
      )}

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

        <Link href={'/mypage'}>
          {clientUser && (
            <UserProfile
              type="header"
              nickname={clientUser.nickname}
              profileImageUrl={clientUser.profileImageUrl}
            />
          )}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
