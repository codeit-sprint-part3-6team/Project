import UserProfile from '@/components/common/userprofile/UserProfile';
import CDSButton from '@/components/common/button/CDSButton';
import Crown from 'public/ic/ic_crown.svg';
import deleteMembers from '@/lib/editdashboard/deleteMembers';
import styles from './MemberList.module.css';

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

interface MemberListProps {
  members: DashboardMember[] | undefined;
  setMembers: React.Dispatch<React.SetStateAction<DashboardMember[]>>;
}

export default function MemberList({ members, setMembers }: MemberListProps) {
  const handleDeleteClick = async (memberId: number) => {
    try {
      await deleteMembers(memberId);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId),
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
            <UserProfile
              nickname={member.nickname}
              profileImageUrl={member.profileImageUrl}
            />
            {member.isOwner ? (
              <Crown className={styles.crown} />
            ) : (
              <CDSButton
                btnType="delete"
                onClick={() => handleDeleteClick(member.id)}
              >
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
