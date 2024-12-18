import { Key, useEffect, useState } from 'react';
import styles from './InvitedMember.module.css';

import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';

type memberProps = {
  id: Key;
  nickname: string;
  profileImageUrl: string;
};

function InvitedMember({ invitedMember }) {
  const [count, setCount] = useState<number>(4);
  const visibleAvatars = count;
  const overflowThreshold = count;

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth >= 1199) {
        setCount(4); // 데스크탑
      } else if (window.innerWidth >= 743) {
        setCount(3); // 태블릿
      } else {
        setCount(2); // 모바일
      }
    };

    updatePageSize();
    window.addEventListener('resize', updatePageSize);

    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  return (
    <>
      {invitedMember.length !== 0 && (
        <div className={styles['invited-member']}>
          <AvatarGroup className={styles['avatar-group']}>
            {invitedMember
              .slice(0, visibleAvatars)
              .map((member: memberProps) => (
                <Avatar
                  key={member.id}
                  alt={member.nickname}
                  src={member.profileImageUrl}
                />
              ))}

            {invitedMember.length > overflowThreshold && (
              <Avatar className={styles['avatar-overflow']}>
                +{invitedMember.length - overflowThreshold}
              </Avatar>
            )}
          </AvatarGroup>
        </div>
      )}
    </>
  );
}

export default InvitedMember;
