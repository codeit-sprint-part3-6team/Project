import axios from '@/lib/instance';
import { GetCardParams, GetCardsResponse } from '@/type/card';

const getCards = async ({
  teamId,
  size = 4,
  cursorId = null,
  columnId,
}: GetCardParams): Promise<GetCardsResponse> => {
  try {
    const response = await axios.get(`/${teamId}/cards/`, {
      params: {
        size,
        cursorId,
        columnId,
      },
    });

    if (response.status === 200) return response.data;
    throw new Error('카드 목록을 불러오는 데 실패했습니다.');
  } catch (error) {
    console.error('카드 목록 조회 실패 : ', error);
    throw error;
  }
};

export default getCards;
