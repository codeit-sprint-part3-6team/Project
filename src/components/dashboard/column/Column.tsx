import styles from '@/components/dashboard/column/Column.module.css';
import CDSButton from '@/components/common/button/CDSButton';
import Card from '@/components/dashboard/card/Card';
import { useCallback, useEffect, useRef, useState } from 'react';
import SettingIcon from 'public/ic/ic_setting.svg';
import Link from 'next/link';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useColumnData from '@/hooks/useColumnData';
import CreateCard from '@/components/product/dashboard/card/CreateCard';

interface ColumnProp {
  targetId: number;
  title: string;
}

function Column({ targetId, title }: ColumnProp) {
  const { columnData, fetchCards } = useColumnData(targetId);
  const isFirstRender = useRef(true); // StrictMode 때문에 api 2번 요청해서 임시로 추가
  const [modal, setModal] = useState(false);

  const handleObserver = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && columnData.cursorId)
        fetchCards(columnData.cursorId);
    },
    [fetchCards, columnData.cursorId],
  );

  const endPoint = useIntersectionObserver(handleObserver);

  const handleClick = () => {
    setModal(true);
  };

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
          {title}
          <span className={styles['column-size']}>{columnData.totalCount}</span>
        </div>
        <Link
          href={`/dashboard/${targetId}/edit`}
          className={styles['btn-edit-column']}
        >
          <SettingIcon className={styles['icon-setting']} />
        </Link>
      </div>
      <CDSButton btnType="todo" onClick={handleClick} />
      <div className={styles['card-section']}>
        {columnData.cards.map((card) => (
          <Card
            key={`card_${card.id}`}
            imageUrl={card.imageUrl}
            id={card.id}
            title={card.title}
            tags={card.tags}
            dueDate={card.dueDate}
          />
        ))}
        {columnData.cursorId && (
          <div ref={endPoint} className={styles['end-point']} />
        )}
      </div>
      {modal && <CreateCard onClose={() => setModal(false)} />}
    </div>
  );
}

export default Column;
