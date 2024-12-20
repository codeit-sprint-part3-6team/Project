import styles from '@/components/dashboard/column/Column.module.css';
import CDSButton from '@/components/common/button/CDSButton';
import Card from '@/components/dashboard/card/Card';
import { useCallback, useEffect, useState } from 'react';
import SettingIcon from 'public/ic/ic_setting.svg';
import Link from 'next/link';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useColumnData from '@/hooks/useColumnData';
import CreateCard from '@/components/product/dashboard/create-card/CreateCard';

interface ColumnProp {
  columnId: number;
  columnTitle: string;
}

function Column({ columnId, columnTitle }: ColumnProp) {
  const { columnData, setColumnData, fetchCards } = useColumnData(columnId);
  const [modal, setModal] = useState(false); // 카드 생성 모달 띄우기 위한 state

  const handleClick = () => {
    // 카드 생성 모달 띄우기 위한 함수수
    setModal(true);
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
        <Link
          href={`/dashboard/${columnId}/edit`}
          className={styles['btn-edit-column']}
        >
          <SettingIcon className={styles['icon-setting']} />
        </Link>
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
              onUpdate={() => fetchCards({ reset: true })}
            />
          ),
        )}
        {columnData.cursorId && (
          <div ref={endPoint} className={styles['end-point']} />
        )}
      </div>
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
