import CDSButton from '@/components/common/button/CDSButton';
import { Invitaion } from '@/type/dashboard';
import styles from './InviteList.module.css';

interface InviteListProps {
  invitations: Invitaion[];
}

export default function InviteList({ invitations }: InviteListProps) {
  const handleClick = () => {
    alert('삭제버튼누름');
  };

  return (
    <div>
      {invitations?.map((invitation, index) => (
        <div key={invitation.id}>
          <div className={styles.container}>
            <h1 className={styles.title}>{invitation.invitee.email}</h1>
            <CDSButton btnType="delete" onClick={handleClick}>
              취소
            </CDSButton>
          </div>
          {index < invitations.length - 1 && <hr className={styles.line} />}
        </div>
      ))}
    </div>
  );
}
