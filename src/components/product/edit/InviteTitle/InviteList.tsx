import { DashboardInvitation } from '@/type/edit_dashboard';
import CDSButton from '@/components/common/button/CDSButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './InviteList.module.css';

interface InviteListProps {
  invitations: DashboardInvitation[] | undefined;
  handleDeleteButtonClick: (invitationId: number) => void;
}
export default function MemberList({
  invitations,
  handleDeleteButtonClick,
}: InviteListProps) {
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

  const handleClick = (e) => {
    handleDeleteButtonClick(e);
  };

  return (
    <div>
      {invitations?.map((invitation, index) => (
        <div key={invitation.id}>
          <div className={styles.container}>
            <h1 className={styles.title}>{user.email}</h1>
            <CDSButton
              btnType="delete"
              onClick={() => handleClick(invitation.id)}
            >
              취소
            </CDSButton>
          </div>
          {index < invitations.length - 1 && <hr className={styles.line} />}
        </div>
      ))}
    </div>
  );
}
