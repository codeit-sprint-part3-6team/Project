import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UserProfile from '../userprofile/UserProfile';
import styles from './Navbar.module.css';
import { RootState } from '@/redux/store';
import NavButton from '../button/NavButton';

type NavbarProps = {
  title: string;
};

function Navbar({ title }: NavbarProps) {
  const user = useSelector((state: RootState) => state.userInfo.user);
  const [clientUser, setClientUser] = useState(null);

  useEffect(() => {
    setClientUser(user);
  }, [user]);

  return (
    <div className={styles.navbar}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles['right-nav']}>
        <NavButton
          btnType="management"
          buttonName="관리"
          onClick={() => alert('관리')}
        />
        <NavButton
          btnType="invite"
          buttonName="초대하기"
          onClick={() => alert('초대하기')}
        />

        <div className={styles['user-profile']}>
          {clientUser && (
            <UserProfile
              type="header"
              nickname={clientUser.nickname}
              profileImageUrl={clientUser.profileImageUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
