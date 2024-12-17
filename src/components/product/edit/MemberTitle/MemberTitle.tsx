import CDSButton from '@/components/common/button/CDSButton';
import MemberList from './MemberList';
import styles from './MemberTitle.module.css';

export default function MemberTitle() {
  // 페이지네이션 구현
  const handlePageChange = (e) => {
    console.log(e);
  };

  return (
    <section className={styles.title_container}>
      <div className={styles.member_section}>
        <h1 className={styles.title}>구성원</h1>
        <div className={styles.button}>
          <CDSButton
            btnType="pagination_prev"
            onClick={handlePageChange}
            disabled
          />
          <CDSButton btnType="pagination_next" onClick={handlePageChange} />
        </div>
      </div>
      <div className={styles.name_section}>
        <h2 className={styles.sub_title}>이름</h2>
        <MemberList />
      </div>
    </section>
  );
}
