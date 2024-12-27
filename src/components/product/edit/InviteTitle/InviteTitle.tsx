import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import WhitePlus from 'public/ic/ic_whiteplus.svg';
import InviteModal from '@/components/common/modal/general/GeneralModal';
import getInvitations, {
  GetInvitationsResponse,
} from '@/lib/editdashboard/getInvitation';
import postInvite from '@/lib/invite/postInvite';
import styles from './InviteTitle.module.css';
import InviteList from './InviteList';
import AuthModal from '@/components/common/modal/auth/AuthModal';
import { toast } from 'react-toastify';

const INITIAL_VALUES = {
  email: '',
};

export default function InviteTitle() {
  const [members, setMembers] = useState<GetInvitationsResponse['invitations']>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState<{ email: string }>(
    INITIAL_VALUES,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    const fetchInvitations = async () => {
      try {
        const response = await getInvitations({
          page: currentPage,
          size: 5,
          dashboardId: Number(router.query.id),
        });
        setMembers(response.invitations);
        setTotalPages(Math.ceil(response.totalCount / 5));
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    fetchInvitations();
  }, [router.query.id, currentPage, isModalOpen]);

  // 초대 요청을 보내고 alert
  useEffect(() => {
    if (!isModalOpen && alertMessage) {
      toast.success(alertMessage);
      setAlertMessage(null);
    }
  }, [isModalOpen, alertMessage]);

  const submitInvite = async () => {
    const id = Number(router.query.id);

    try {
      const response = await postInvite({ id, email: emailValue.email });
      setIsModalOpen(false);
      setEmailValue(INITIAL_VALUES);
      setAlertMessage(
        `${response.invitee.nickname}님께 초대 요청을 보냈습니다.`,
      );
    } catch (error) {
      setIsModalOpen(false);
      setResponseMessage(error.message);
      setIsModalVisible(true);
      setEmailValue(INITIAL_VALUES);
    }
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsModalVisible(false);
  };

  return (
    <section className={styles['title-container']}>
      <div className={styles['member-section']}>
        <h1 className={styles.title}>초대 내역</h1>
        <div className={styles['button-section']}>
          <div className={styles['pagination-button']}>
            <span className={styles['page-info']}>
              {totalPages} 페이지 중 {currentPage}
            </span>
            <CDSButton
              btnType="pagination_prev"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            />
            <CDSButton
              btnType="pagination_next"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
            />
          </div>
          <div className={styles['invite-button-section']}>
            <button
              type="button"
              className={styles['invite-button']}
              onClick={() => setIsModalOpen(true)}
            >
              <WhitePlus className={styles['plus-button']} /> 초대하기
            </button>
          </div>
        </div>
      </div>
      <div className={styles['name-section']}>
        <h2 className={styles['sub-title']}>이메일</h2>
        <InviteList members={members} setMembers={setMembers} />
      </div>
      <InviteModal
        label="이메일"
        placeholder="이메일을 입력해 주세요"
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="초대하기"
        inputValue={emailValue.email}
        onInputChange={(value) => setEmailValue({ email: value })}
        cancelTitle="취소"
        adaptTitle="초대"
        handleCancelClick={handleCancelClick}
        handleAdaptClick={submitInvite}
      />

      {isModalVisible && (
        <AuthModal
          message={responseMessage}
          handleCancelClick={handleCancelClick}
        />
      )}
    </section>
  );
}
