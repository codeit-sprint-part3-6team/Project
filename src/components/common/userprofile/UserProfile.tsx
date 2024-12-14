import styles from './UserProfile.module.css';
import Avatar from '@mui/material/Avatar';

type UserProfileProps = {
  type?: 'header' | 'dashboard_detail' | 'todo_detail' | 'todo_create';
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
  return (
    <>
      <div className={`${styles.user_profile} ${styles[type]}`}>
        <div className={styles.user_img}>
          {profileImageUrl ? (
            <Avatar src={profileImageUrl} alt={nickname} />
          ) : (
            <Avatar>{nickname[0].toUpperCase()}</Avatar>
          )}
        </div>

        {!onlyImg && <span className={styles.user_nickname}>{nickname}</span>}
      </div>
    </>
  );
}

export default UserProfile;
