import { Key, useEffect, useState } from 'react';

import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import styles from './InvitedMember.module.css';

type memberProps = {
  id: Key;
  nickname: string;
  profileImageUrl: string;
};

function InvitedMember({ invitedMember }) {
  const [visibleAvatars, setVisibleAvatars] = useState(4);

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth >= 1199) {
        setVisibleAvatars(4); // 데스크탑
      } else if (window.innerWidth >= 743) {
        setVisibleAvatars(3); // 태블릿
      } else {
        setVisibleAvatars(2); // 모바일
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

            {invitedMember.length > visibleAvatars && (
              <Avatar className={styles['avatar-overflow']}>
                +{invitedMember.length - visibleAvatars}
              </Avatar>
            )}
          </AvatarGroup>
        </div>
      )}
    </>
  );
}

export default InvitedMember;
