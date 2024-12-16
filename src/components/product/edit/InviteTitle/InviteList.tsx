import { DashboardMember } from '@/type/edit_dashboard';
import UserProfile from '@/components/common/userprofile/UserProfile';
import CDSButton from '@/components/common/button/CDSButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './InviteList.module.css';

interface MeberListProps {
  members: DashboardMember[] | undefined;
}

export default function MemberList({ members }: MeberListProps) {
  const [user, setUser] = useState<any>();

  const getData = async () => {
    const response = await axios.get(
      'https://sp-taskify-api.vercel.app/11-6/users/me',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1MSwidGVhbUlkIjoiMTEtNiIsImlhdCI6MTczNDMzNjUwOSwiaXNzIjoic3AtdGFza2lmeSJ9.UYsVZaBj6eSLL_QSdWlQZz7hBW3bi9PeivXtwt7Cs1c',
        },
      },
    );
    setUser(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!user) {
    return null;
  }

  /** 취소기능추가 */
  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <div>
      {members?.map((member, index) => (
        <div key={member.id}>
          <div className={styles.container}>
            <UserProfile nickname={user.email} />
            <CDSButton btnType="delete" onClick={handleClick}>
              취소
            </CDSButton>
          </div>
          {index < members.length - 1 && <hr className={styles.line} />}
        </div>
      ))}
    </div>
  );
}
