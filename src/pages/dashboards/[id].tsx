import Sidebar from '@/components/common/sidebar/Sidebar';
import CDSButton from '@/components/common/button/CDSButton';
import getColumns from '@/lib/dashboard/getColumns';
import { useEffect, useState, useCallback } from 'react';
import styles from '@/pages/dashboards/Dashboard.module.css';
import Column from '@/components/dashboard/column/Column';
import { Column as ColumnType } from '@/type/column';
import { useRouter } from 'next/router';

function DashBoard() {
  const { query } = useRouter();
  const [columns, setColumns] = useState<ColumnType[]>([]);

  const fetchColumns = useCallback(async () => {
    const dashboardId = Number(query.id);
    if (!dashboardId) return;
    try {
      const { data, result } = await getColumns({
        teamId: '11-6',
        dashboardId,
      });

      if (result === 'SUCCESS') {
        setColumns(data);
      }
    } catch (error) {
      console.error('컬럼 조회 실패 : ', error);
    }
  }, [query.id]);

  useEffect(() => {
    fetchColumns();
  }, [fetchColumns]);

  return (
    <div>
      <Sidebar />
      <div className={styles.container}>
        {columns.map(({ id, title }) => (
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
