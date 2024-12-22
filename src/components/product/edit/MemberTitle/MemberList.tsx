import UserProfile from '@/components/common/userprofile/UserProfile';
import CDSButton from '@/components/common/button/CDSButton';
import Crown from 'public/ic/ic_crown.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MemberList.module.css';
import deleteMembers from '@/lib/editdashboard/deleteMembers';

interface DashboardMember {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

interface MeberListProps {
  members: DashboardMember[] | undefined;
}

export default function MemberList({ members }: MeberListProps) {
  const [user, setUser] = useState<any>();
  const [memberId, setMemberId] = useState<number | null>(null);

  // 멤버 가져오기
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
    setMemberId(response.data.id);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!user) {
    return null;
  }

  /** 삭제기능추가 */
  const handleClick = async (memberId: number) => {
    try {
      await deleteMembers(memberId);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <div>
      {members?.map((member, index) => (
        <div key={member.id}>
          <div className={styles.container}>
            <UserProfile
              nickname={user.nickname}
              profileImageUrl={user.profileImageUrl}
            />
            {member.isOwner ? (
              <Crown />
            ) : (
              <CDSButton btnType="delete" onClick={() => handleClick(member.id)}>
                삭제
              </CDSButton>
            )}
          </div>
          {index < members.length - 1 && <hr className={styles.line} />}
        </div>
      ))}
    </div>
  );
}
