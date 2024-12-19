import { useState, useCallback, useEffect, useRef } from 'react';
import SettingIcon from 'public/ic/ic_setting.svg';
import styles from '@/components/dashboard/column/Column.module.css';
import CDSButton from '@/components/common/button/CDSButton';
import Card from '@/components/dashboard/card/Card';
import putColumns from '@/lib/dashboard/putColumns';
import GeneralModal from '@/components/common/modal/general/GeneralModal';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useColumnData from '@/hooks/useColumnData';

interface ColumnProp {
  columnId: number;
  columnTitle: string;
}

function Column({ columnId, columnTitle: initialTitle }: ColumnProp) {
  const { columnData, setColumnData, fetchCards } = useColumnData(columnId);
  const isFirstRender = useRef(true);
  const [showModal, setShowModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState(initialTitle);
  const [editedTitle, setEditedTitle] = useState(columnTitle);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleCancleClick = () => {
    closeModal();
    setEditedTitle(columnTitle);
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

      closeModal();
    } catch (error) {
      alert(error.message || '컬럼 제목 수정 중 오류가 발생했습니다.');
    }
  };

  const handleObserver = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && columnData.cursorId)
        fetchCards(columnData.cursorId);
    },
    [fetchCards, columnData.cursorId],
  );

  const endPoint = useIntersectionObserver(handleObserver);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

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
          onClick={openModal}
        >
          <SettingIcon className={styles['icon-setting']} />
        </button>
      </div>
      <CDSButton btnType="todo" />
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
              setColumnData={setColumnData}
            />
          ),
        )}
        {columnData.cursorId && (
          <div ref={endPoint} className={styles['end-point']} />
        )}
      </div>

      {/* 모달창 */}
      {showModal && (
        <GeneralModal
          isOpen={showModal}
          onClose={closeModal}
          title="컬럼 제목 수정"
          inputValue={editedTitle}
          onInputChange={(value) => setEditedTitle(value)}
          cancletitle="삭제"
          handleCancleClick={handleCancleClick}
          adapttitle="변경"
          handleAdaptClick={handleAdaptClick}
        />
      )}
    </div>
  );
}

export default Column;
