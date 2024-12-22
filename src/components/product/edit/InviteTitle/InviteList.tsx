import CDSButton from '@/components/common/button/CDSButton';
import { Invitaion } from '@/type/dashboard';
import deleteInvitation from '@/lib/editdashboard/deleteDashboardsInvitations';
import { useRouter } from 'next/router';
import styles from './InviteList.module.css';

interface InviteListProps {
  invitations: Invitaion[];
}

export default function InviteList({ invitations }: InviteListProps) {
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  const handleDeleteClick = async (invitationId: number) => {
    try {
      await deleteInvitation(dashboardId, invitationId);
      router.reload();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <div>
      {invitations?.map((invitation, index) => (
        <div key={invitation.id}>
          <div className={styles.container}>
            <h1 className={styles.title}>{invitation.invitee.email}</h1>
            <CDSButton
              btnType="delete"
              onClick={() => handleDeleteClick(invitation.id)}
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
