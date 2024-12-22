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
              nickname={member.nickname}
              profileImageUrl={member.profileImageUrl}
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
