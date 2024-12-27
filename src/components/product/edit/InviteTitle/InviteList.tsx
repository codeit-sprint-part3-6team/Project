import { useState } from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import { Invitaion } from '@/type/dashboard';
import deleteInvitation from '@/lib/editdashboard/deleteDashboardsInvitations';
import { useRouter } from 'next/router';
import styles from './InviteList.module.css';

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles['modal-container']} onClick={handleContainerClick}>
      <div className={styles['modal-section']}>
        <h3>정말 초대를 취소하시겠습니까?</h3>
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

interface InviteListProps {
  members: Invitaion[];
  setMembers: React.Dispatch<React.SetStateAction<Invitaion[]>>;
}

export default function InviteList({ members, setMembers }: InviteListProps) {
  const router = useRouter();
  const dashboardId = Number(router.query.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState<
    number | null
  >(null);

  const handleDeleteClick = async () => {
    if (selectedInvitationId === null) return;

    try {
      await deleteInvitation(dashboardId, selectedInvitationId);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== selectedInvitationId),
      );
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      closeModal();
    }
  };

  const openModal = (invitationId: number) => {
    setSelectedInvitationId(invitationId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvitationId(null);
  };

  return (
    <div>
      {members?.map((member, index) => (
        <div key={member.id}>
          <div className={styles.container}>
            <h1 className={styles.title}>{member.invitee.email}</h1>
            <CDSButton btnType="delete" onClick={() => openModal(member.id)}>
              취소
            </CDSButton>
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
