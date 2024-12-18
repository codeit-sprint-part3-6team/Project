import { Key } from 'react';
import styles from './InvitedMember.module.css';

import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';

type memberProps = {
  id: Key;
  nickname: string;
  profileImageUrl: string;
};

function InvitedMember({ invitedMember }) {
  const visibleAvatars = 4;
  const overflowThreshold = 4;

  return (
    <>
      {invitedMember.length !== 0 && (
        <div className={styles['invited-member']}>
          <AvatarGroup className={styles.test}>
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
