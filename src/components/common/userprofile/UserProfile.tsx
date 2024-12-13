import styles from './UserProfile.module.css';
import Image from 'next/image';
import DefaultImg from '../../../../public/images/img_profiledefault.svg';

type UserProfile = {
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
}: UserProfile) {
  const imageSrc = profileImageUrl || DefaultImg;

  return (
    <>
      <div className={`${styles.user_profile} ${styles[type]}`}>
        <div className={styles.user_img}>
          {profileImageUrl ? (
            <Image src={imageSrc} alt={nickname} fill />
          ) : (
            <DefaultImg />
          )}
        </div>
        {!onlyImg && <span className={styles.user_nickname}>{nickname}</span>}
      </div>
    </>
  );
}

export default UserProfile;
