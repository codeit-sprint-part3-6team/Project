import { useState } from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import DeleteCardsModal from '@/components/common/modal/delete-cards/DeleteCardsModal';
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

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState<
    number | null
  >(null);

  const openDeleteModal = (invitationId: number) => {
    setSelectedInvitationId(invitationId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedInvitationId(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteClick = async () => {
    if (selectedInvitationId === null) return;
    try {
      await deleteInvitation(dashboardId, selectedInvitationId);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== selectedInvitationId),
      );
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting invitation:', error);
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
              onClick={() => openDeleteModal(member.id)}
            >
              취소
            </CDSButton>
          </div>
          {index < members.length - 1 && <hr className={styles.line} />}
        </div>
      ))}
      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <DeleteCardsModal
          onClose={closeDeleteModal}
          message="정말로 초대를 취소하시겠습니까?"
          handleCancelClick={closeDeleteModal}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </div>
  );
}
