import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NavButton from '../button/NavButton';
import UserProfile from '../userprofile/UserProfile';
import InvitedMember from '../invitedmember/InvitedMember';
import GeneralModal from '../modal/general/GeneralModal';
import Dropdown from '../dropdown/Dropdown';
import { getDashboard, getMember } from '@/lib/navbar/getNavbar';
import postInvite from '@/lib/invite/postInvite';
import AuthModal from '../modal/auth/AuthModal';

const INITIAL_VALUES = {
  email: '',
};

function Navbar() {
  const [dashboardData, setDashboardData] = useState(null);
  const [invitedMember, setInvitedMember] = useState([]);
  const user = useSelector((state: RootState) => state.userInfo.user);
  const [clientUser, setClientUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState(INITIAL_VALUES);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    pathname,
    query: { id },
  } = router;

  const isMyDashboard = pathname !== '/mydashboard';
  const isMyPage = pathname !== '/mypage';
  const isEdit = pathname !== '/dashboard/[id]/edit';

  useEffect(() => {
    setClientUser(user);
  }, [user]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchDashboardData = async () => {
      const memberData = await getMember(id);
      setInvitedMember(memberData);

      const dashboardData = await getDashboard(id);
      setDashboardData(dashboardData);
    };

    fetchDashboardData();
  }, [id]);

  // 초대 요청을 보내고 alert
  useEffect(() => {
    if (!isModalOpen && alertMessage) {
      alert(alertMessage);
      setAlertMessage(null);
    }
  }, [isModalOpen, alertMessage]);

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
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      router.push('/');
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsModalVisible(false);
  };

  const submitInvite = async () => {
    const id = Number(router.query.id);

    try {
      const response = await postInvite({ id, email: emailValue.email });
      setIsModalOpen(false);
      setEmailValue(INITIAL_VALUES);
      setAlertMessage(
        `${response.invitee.nickname}님께 초대 요청을 보냈습니다.`,
      );
    } catch (error) {
      setIsModalOpen(false);
      setResponseMessage(error.message);
      setIsModalVisible(true);
      setEmailValue(INITIAL_VALUES);
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
                  router.push(`/dashboard/${router.query.id}/edit`)
                }
              />
            )}

            <NavButton
              btnType="invite"
              buttonName="초대하기"
              onClick={() => setIsModalOpen(true)}
            />

            <GeneralModal
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              isOpen={isModalOpen}
              onClose={handleCancelClick}
              title="초대하기"
              inputValue={emailValue.email}
              onInputChange={(value) => setEmailValue({ email: value })}
              cancelTitle="취소"
              adaptTitle="초대"
              handleCancelClick={handleCancelClick}
              handleAdaptClick={submitInvite}
            />

            {isModalVisible && (
              <AuthModal
                message={responseMessage}
                handleCancelClick={handleCancelClick}
              />
            )}

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
