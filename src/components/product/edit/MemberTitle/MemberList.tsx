import UserProfile from '@/components/common/userprofile/UserProfile';
import CDSButton from '@/components/common/button/CDSButton';
import Crown from 'public/ic/ic_crown.svg';
import DeleteCardsModal from '@/components/common/modal/delete-cards/DeleteCardsModal';
import deleteMembers from '@/lib/editdashboard/deleteMembers';
import { useState } from 'react';
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
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const openDeleteModal = (memberId: number) => {
    setSelectedMemberId(memberId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedMemberId(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteClick = async () => {
    if (selectedMemberId === null) return;
    try {
      await deleteMembers(selectedMemberId);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== selectedMemberId),
      );
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting member:', error);
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
                onClick={() => openDeleteModal(member.id)}
              >
                삭제
              </CDSButton>
            )}
          </div>
          {index < (members.length || 0) - 1 && <hr className={styles.line} />}
        </div>
      ))}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <DeleteCardsModal
          onClose={closeDeleteModal}
          message="정말로 구성원을 삭제하시겠습니까?"
          handleCancelClick={closeDeleteModal}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </div>
  );
}
