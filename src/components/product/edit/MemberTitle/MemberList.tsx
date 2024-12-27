import { useState } from 'react';
import UserProfile from '@/components/common/userprofile/UserProfile';
import CDSButton from '@/components/common/button/CDSButton';
import Crown from 'public/ic/ic_crown.svg';
import deleteMembers from '@/lib/editdashboard/deleteMembers';
import styles from './MemberList.module.css';

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-section']}>
        <h3>정말 이 구성원을 삭제하시겠습니까?</h3>
        <div className={styles['modal-button']}>
          <button onClick={onClose} className={styles['cancel-button']}>
            취소
          </button>
          <button onClick={onConfirm} className={styles['confirm-button']}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

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

interface MeberListProps {
  members: DashboardMember[] | undefined;
  setMembers: React.Dispatch<React.SetStateAction<DashboardMember[]>>;
}

export default function MemberList({ members, setMembers }: MeberListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const openModal = (memberId: number) => {
    setSelectedMemberId(memberId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMemberId(null);
  };

  const handleDeleteClick = async () => {
    if (selectedMemberId === null) return;

    try {
      await deleteMembers(selectedMemberId);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== selectedMemberId),
      );
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      closeModal();
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
              <CDSButton btnType="delete" onClick={() => openModal(member.id)}>
                삭제
              </CDSButton>
            )}
          </div>
          {index < members.length - 1 && <hr className={styles.line} />}
        </div>
      ))}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteClick}
      />
    </div>
  );
}
