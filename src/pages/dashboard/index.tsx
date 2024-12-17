import Sidebar from '@/components/common/sidebar/Sidebar';
import CDSButton from '@/components/common/button/CDSButton';
import getColumns from '@/lib/dashboard/getColumns';
import { useEffect, useState } from 'react';
import styles from '@/pages/dashboard/Dashboard.module.css';
import Column from '@/components/dashboard/column/Column';

function DashBoard() {
  const [lists, setLists] = useState([]);

  const fetchColumns = async () => {
    try {
      const response = await getColumns({ teamId: '11-6', dashboardId: 12837 });

      const { data, result } = response;

      if (result === 'SUCCESS') {
        setLists(data);
      }
    } catch (error) {
      console.error('컬럼 조회 실패 : ', error);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className={styles.container}>
        {lists.map(({ id, title }) => (
          <Column key={`column_${id}`} targetId={id} title={title} />
        ))}
        <div className={styles['add-column']}>
          <CDSButton btnType="column">새로운 컬럼 추가하기</CDSButton>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
