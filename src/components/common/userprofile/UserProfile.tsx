import Avatar from '@mui/material/Avatar';
import styles from './UserProfile.module.css';

type UserProfileProps = {
  type?: 'header' | 'dashboard-detail' | 'todo-detail' | 'todo-create';
  onlyImg?: boolean;
  nickname: string;
  profileImageUrl?: string | null;
};

function UserProfile({
  type,
  onlyImg,
  nickname,
  profileImageUrl,
}: UserProfileProps) {
  if (!nickname) return null;
  return (
    <>
      <div className={`${styles['user-profile']} ${styles[type]}`}>
        <div className={styles['user-img']}>
          {profileImageUrl ? (
            <Avatar src={profileImageUrl} alt={nickname} />
          ) : (
            <Avatar>{nickname[0].toUpperCase()}</Avatar>
          )}
        </div>

        {!onlyImg && (
          <span className={styles['user-nickname']}>{nickname}</span>
        )}
      </div>
    </>
  );
}

export default UserProfile;
