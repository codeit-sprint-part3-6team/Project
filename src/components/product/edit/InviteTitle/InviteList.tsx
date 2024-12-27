import CDSButton from '@/components/common/button/CDSButton';
import { Invitaion } from '@/type/dashboard';
import deleteInvitation from '@/lib/editdashboard/deleteDashboardsInvitations';
import { useRouter } from 'next/router';
import styles from './InviteList.module.css';

interface InviteListProps {
  members: Invitaion[];
  setMembers: React.Dispatch<React.SetStateAction<Invitaion[]>>;
}

export default function InviteList({ members, setMembers }: InviteListProps) {
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  const handleDeleteClick = async (invitationId: number) => {
    try {
      await deleteInvitation(dashboardId, invitationId);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== invitationId),
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <div>
      {members?.map((member, index) => (
        <div key={member.id}>
          <div className={styles.container}>
            <h1 className={styles.title}>{member.invitee.email}</h1>
            <CDSButton
              btnType="delete"
              onClick={() => handleDeleteClick(member.id)}
            >
              취소
            </CDSButton>
          </div>
          {index < members.length - 1 && <hr className={styles.line} />}
        </div>
      ))}
    </div>
  );
}
