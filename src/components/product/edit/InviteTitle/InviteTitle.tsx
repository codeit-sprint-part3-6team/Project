import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import WhitePlus from 'public/ic/ic_whiteplus.svg';
import InviteModal from '@/components/common/modal/general/GeneralModal';
import postInvite from '@/lib/invite/postInvite';
import AuthModal from '@/components/common/modal/auth/AuthModal';
import InvitedMember from '@/components/common/invitedmember/InvitedMember';
import styles from './InviteTitle.module.css';
import InviteList from './InviteList';

const INITIAL_VALUES = { email: '' };

export default function InviteTitle() {
  const [currentPage, setCurrentPage] = useState(1);
  const [invitedMember, setInvitedMember] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState(INITIAL_VALUES);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [invitations, setInvitations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isModalOpen && alertMessage) {
      alert(alertMessage);
      setAlertMessage(null);
    }
  }, [isModalOpen, alertMessage]);

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsModalVisible(false);
  };

  const submitInvite = async () => {
    const id = Number(router.query.id);
    try {
      const response = await postInvite({ id, email: emailValue.email });
      setIsModalOpen(false);
      setEmailValue(INITIAL_VALUES);
      setAlertMessage(
        `${response.invitee.nickname}님께 초대 요청을 보냈습니다.`,
      );
      setInvitations((prev) => [...prev, response]);
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
    } else if (direction === 'next' && currentPage < 10) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className={styles.title_container}>
      <div className={styles.member_section}>
        <h1 className={styles.title}>초대 내역</h1>
        <div className={styles.button_section}>
          <div className={styles.pagination_button}>
            <CDSButton
              btnType="pagination_prev"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            />
            <CDSButton
              btnType="pagination_next"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === 10}
            />
          </div>
          <div className={styles.mobile_hidden_button}>
            <button
              type="button"
              className={styles.invite_button}
              onClick={() => setIsModalOpen(true)}
            >
              <WhitePlus className={styles.plus_button} /> 초대하기
            </button>
          </div>
        </div>
      </div>
      <div className={styles.name_section}>
        <h2 className={styles.sub_title}>이메일</h2>
        <InviteList invitations={invitations} />
      </div>
      <div>
        <InviteModal
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          isOpen={isModalOpen}
          onClose={handleCancelClick}
          title="초대하기"
          inputValue={emailValue.email}
          onInputChange={(value) => setEmailValue({ email: value })}
          cancelTitle="취소"
          adaptTitle="생성"
          handleCancelClick={handleCancelClick}
          handleAdaptClick={submitInvite}
        />
        {isModalVisible && (
          <AuthModal
            message={responseMessage}
            handleCancelClick={handleCancelClick}
          />
        )}
        <InvitedMember invitedMember={invitedMember} />
      </div>
    </section>
  );
}
