import CDSButton from '@/components/common/button/CDSButton';
import getMembers from '@/lib/editdashboard/getMembers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberList from './MemberList';
import styles from './MemberTitle.module.css';

export default function MemberTitle() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<any[]>([]);
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const params = {
          page: currentPage,
          size: 10,
          dashboardId,
        };
        const data = await getMembers(params);
        setMembers(data.member);
        setTotalPages(Math.ceil(data.totalCount / 10));
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [currentPage, dashboardId]);

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
        <h1 className={styles.title}>구성원</h1>
        <div className={styles.button}>
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
      </div>
      <div className={styles.name_section}>
        <h2 className={styles.sub_title}>이름</h2>
        <MemberList members={members} />
      </div>
    </section>
  );
}
