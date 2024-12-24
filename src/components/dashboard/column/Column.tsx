import { useState, useCallback, useEffect } from 'react';
import SettingIcon from 'public/ic/ic_setting.svg';
import styles from '@/components/dashboard/column/Column.module.css';
import CDSButton from '@/components/common/button/CDSButton';
import Card from '@/components/dashboard/card/Card';
import putColumns from '@/lib/dashboard/putColumns';
import GeneralModal from '@/components/common/modal/general/GeneralModal';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useColumnData from '@/hooks/useColumnData';
import useModal from '@/hooks/useModal';
import deleteColumns from '@/lib/dashboard/deleteColumns';
import { Column as ColumnType } from '@/type/column';
import DeleteCardsModal from '@/components/common/modal/delete-cards/DeleteCardsModal';
import CreateCard from '@/components/product/dashboard/create-card/CreateCard';

interface ColumnProp {
  columnId: number;
  columnTitle: string;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

function Column({
  columnId,
  columnTitle: initialTitle,
  setColumns,
}: ColumnProp) {
  const { columnData, setColumnData, fetchCards } = useColumnData(columnId);
  const [columnTitle, setColumnTitle] = useState(initialTitle);
  const [editedTitle, setEditedTitle] = useState(columnTitle);
  const [modal, setModal] = useState(false); // 카드 생성 모달 띄우기 위한 state

  const handleClick = () => {
    // 카드 생성 모달 띄우기 위한 함수
    setModal(true);
  };

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const {
    isOpen: isConfirmModalOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const handleCancelClick = () => {
    closeEditModal();
    openConfirmModal();
  };

  const handleDeleteClick = async () => {
    try {
      await deleteColumns(columnId);

      setColumns((prev) => prev.filter(({ id }) => id !== columnId));
      closeEditModal();
      setEditedTitle(columnTitle);
    } catch (error) {
      alert(`컬럼 삭제 에러: ${error}`);
    }
  };

  const handleAdaptClick = async () => {
    try {
      const updatedColumn = await putColumns({
        title: editedTitle,
        columnId,
      });

      setColumnTitle(updatedColumn.title);
      setColumnData((prev) => ({
        ...prev,
        title: updatedColumn.title,
      }));

      closeEditModal();
    } catch (error) {
      alert(error.message || '컬럼 제목 수정 중 오류가 발생했습니다.');
    }
  };

  const handleObserver = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && columnData.cursorId)
        fetchCards({ cursor: columnData.cursorId });
    },
    [fetchCards, columnData.cursorId],
  );

  const endPoint = useIntersectionObserver(handleObserver);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <div className={styles.column}>
      <div className={styles['column-title-section']}>
        <div className={styles['column-title']}>
          {columnTitle}
          <span className={styles['column-size']}>{columnData.totalCount}</span>
        </div>
        <button
          type="button"
          className={styles['btn-edit-column']}
          onClick={openEditModal}
        >
          <SettingIcon className={styles['icon-setting']} />
        </button>
      </div>
      <CDSButton btnType="todo" onClick={handleClick} />
      <div className={styles['card-section']}>
        {columnData.cards.map(
          ({
            imageUrl,
            id,
            title,
            tags,
            dueDate,
            assignee: { nickname, profileImageUrl },
          }) => (
            <Card
              key={`card_${id}`}
              imageUrl={imageUrl}
              id={id}
              title={title}
              tags={tags}
              dueDate={dueDate}
              nickname={nickname}
              profileImage={profileImageUrl}
              columnTitle={columnTitle}
              columnId={columnId}
              setColumnData={setColumnData}
              onUpdate={() =>
                fetchCards({ size: columnData.totalCount + 1, reset: true })
              }
            />
          ),
        )}
        {columnData.cursorId && (
          <div ref={endPoint} className={styles['end-point']} />
        )}
      </div>

      {/* 모달창 - 수정 */}
      {isEditModalOpen && (
        <GeneralModal
          label="이름"
          placeholder="수정할 이름을 입력해 주세요"
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title="컬럼 제목 수정"
          inputValue={editedTitle}
          onInputChange={(value) => setEditedTitle(value)}
          cancelTitle="삭제"
          handleCancelClick={handleCancelClick}
          adaptTitle="변경"
          handleAdaptClick={handleAdaptClick}
        />
      )}

      {/* 모달창 - 삭제 */}
      {isConfirmModalOpen && (
        <DeleteCardsModal
          message="컬럼의 모든 카드가 삭제됩니다."
          handleCancelClick={() => closeConfirmModal()}
          handleDeleteClick={handleDeleteClick}
        />
      )}

      {modal && ( // 카드 생성 모달 띄우기기
        <CreateCard
          columnId={columnId}
          onClose={() => {
            setModal(false);
          }}
          onUpdate={() =>
            fetchCards({ size: columnData.totalCount + 1, reset: true })
          }
        />
      )}
    </div>
  );
}

export default Column;
