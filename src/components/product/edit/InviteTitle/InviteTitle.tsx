import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import WhitePlus from 'public/ic/ic_whiteplus.svg';
import InviteModal from '@/components/common/modal/general/GeneralModal';
import postInvite from '@/lib/invite/postInvite';
import AuthModal from '@/components/common/modal/auth/AuthModal';
import getInvitations, {
  GetInvitationsResponse,
} from '@/lib/editdashboard/getInvitation';
import styles from './InviteTitle.module.css';
import InviteList from './InviteList';

const INITIAL_VALUES = { email: '' };

export default function InviteTitle() {
  const [members, setMembers] = useState<GetInvitationsResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState(INITIAL_VALUES);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;

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
        alert('Failed to fetch members');
      }
    };
    fetchInvitations();
  }, [router.query.id, currentPage]);

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setIsModalVisible(false);
  };

  const submitInvite = async () => {
    alert('초대버튼누름');
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
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
              disabled={currentPage === totalPages}
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
        <InviteList invitations={members} />
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
      </div>
    </section>
  );
}
