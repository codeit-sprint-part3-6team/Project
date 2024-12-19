import Sidebar from '@/components/common/sidebar/Sidebar';
import CDSButton from '@/components/common/button/CDSButton';
import getColumns from '@/lib/dashboard/getColumns';
import postColumns from '@/lib/dashboard/postColumns';
import { useEffect, useState, useCallback } from 'react';
import styles from '@/pages/dashboard/Dashboard.module.css';
import Column from '@/components/dashboard/column/Column';
import { Column as ColumnType } from '@/type/column';
import { useRouter } from 'next/router';
import GeneralModal from '@/components/common/modal/general/GeneralModal';

function DashBoard() {
  const { query } = useRouter();
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newColumn, setNewColumn] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewColumn('');
  };

  const handleCancleClick = () => {
    closeModal();
  };

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

  const handleAdaptClick = async () => {
    const dashboardId = Number(query.id);

    try {
      await postColumns({
        title: newColumn,
        dashboardId,
      });

      await fetchColumns();
      closeModal();
    } catch (error) {
      alert(error.message || '컬럼 추가 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchColumns();
  }, [fetchColumns]);

  return (
    <div>
      <Sidebar />
      <div className={styles.container}>
        {columns.map(({ id, title }) => (
          <Column key={`column_${id}`} columnId={id} columnTitle={title} />
        ))}
        <div className={styles['add-column']}>
          <CDSButton onClick={openModal} btnType="column">
            새로운 컬럼 추가하기
          </CDSButton>
        </div>
      </div>

      {/* 모달창 */}
      {showModal && (
        <GeneralModal
          isOpen={showModal}
          onClose={closeModal}
          title="새로운 컬럼 추가"
          inputValue={newColumn}
          onInputChange={(value) => setNewColumn(value)}
          cancletitle="취소"
          handleCancleClick={handleCancleClick}
          adapttitle="생성"
          handleAdaptClick={handleAdaptClick}
        />
      )}
    </div>
  );
}

export default DashBoard;
