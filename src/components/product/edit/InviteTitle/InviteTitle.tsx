import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CDSButton from '@/components/common/button/CDSButton';
import WhitePlus from 'public/ic/ic_whiteplus.svg';
import InviteModal from '@/components/common/modal/general/GeneralModal';
import styles from './InviteTitle.module.css';
import InviteList from './InviteList';

export default function InviteTitle() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (newPage) => {
    alert('페이지네이션');
  };

  const handleCancleChange = () => {
    setIsModalOpen(false);
  };

  const handleAdaptChange = () => {
    alert('생성버튼누름');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.title_container}>
      <div className={styles.member_section}>
        <h1 className={styles.title}>초대 내역</h1>
        <div className={styles.button_section}>
          <div className={styles.pagination_button}>
            <CDSButton
              btnType="pagination_prev"
              onClick={handlePageChange}
              disabled
            />
            <CDSButton btnType="pagination_next" onClick={handlePageChange} />
          </div>
          <div className={styles.mobile_hidden_button}>
            <button
              type="button"
              className={styles.invite_button}
              onClick={openModal}
            >
              <WhitePlus className={styles.plus_button} /> 초대하기
            </button>
          </div>
        </div>
      </div>
      <div className={styles.name_section}>
        <h2 className={styles.sub_title}>이메일</h2>
        {/* <InviteList /> */}
      </div>
      <InviteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="초대하기"
        cancletitle="취소"
        handleCancleClick={handleCancleChange}
        adapttitle="생성"
        handleAdaptClick={handleAdaptChange}
      />
    </section>
  );
}
