import { useState, useCallback } from 'react';
import getCards from '@/lib/dashboard/getCards';
import { GetCardsResponse } from '@/type/card';

function useColumnData(targetId: number) {
  const [columnData, setColumnData] = useState<GetCardsResponse>({
    cards: [],
    totalCount: null,
    cursorId: null,
  });

  const fetchCards = useCallback(
    async (cursor?: number) => {
      try {
        const response = await getCards({
          teamId: '11-6',
          columnId: targetId,
          cursorId: cursor,
        });

        const { cards, totalCount, cursorId } = response;

        setColumnData((prev) => ({
          cards: [...prev.cards, ...cards],
          totalCount,
          cursorId,
        }));
      } catch (error) {
        console.error('컬럼 조회 실패 : ', error);
      }
    },
    [targetId],
  );

  return { columnData, fetchCards };
}

export default useColumnData;
