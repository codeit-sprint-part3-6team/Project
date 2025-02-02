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
import Navbar from '@/components/common/navbar/Navbar';
import { toast } from 'react-toastify';
import SkeletonColumn from '@/components/dashboard/column/SkeletonColumn';

function DashBoard() {
  const { query } = useRouter();
  const [columns, setColumns] = useState<ColumnType[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newColumn, setNewColumn] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewColumn('');
  };

  const handleCancelClick = () => {
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
      } else {
        setColumns([]);
      }
    } catch (error) {
      console.error('컬럼 조회 실패 : ', error);
      setColumns([]);
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
      toast.error(error.message || '컬럼 추가 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchColumns();
  }, [fetchColumns]);

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className={`${styles.container} custom-scroll`}>
        {columns === null
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonColumn key={`skeleton_${index}`} />
            ))
          : columns.map(({ id, title }) => (
              <Column
                key={`column_${id}`}
                columnId={id}
                columnTitle={title}
                setColumns={setColumns}
              />
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
          label="이름"
          placeholder="컬럼 이름을 입력해 주세요"
          isOpen={showModal}
          onClose={closeModal}
          title="새로운 컬럼 추가"
          inputValue={newColumn}
          onInputChange={(value) => setNewColumn(value)}
          cancelTitle="취소"
          handleCancelClick={handleCancelClick}
          adaptTitle="생성"
          handleAdaptClick={handleAdaptClick}
        />
      )}
    </div>
  );
}

export default DashBoard;
