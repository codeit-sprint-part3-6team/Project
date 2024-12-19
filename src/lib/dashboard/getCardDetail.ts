import axios from '@/lib/instance';
import { GetCardDetailParams, Card } from '@/type/card';

const getCardDetail = async ({
  cardId,
}: GetCardDetailParams): Promise<Card> => {
  try {
    const response = await axios.get(`/11-6/cards/${cardId}`);

    if (response.status === 200) return response.data;
    throw new Error('카드 정보를 불러오는 데 실패했습니다.');
  } catch (error) {
    console.error('카드 조회 실패 : ', error);
    throw error;
  }
};

export default getCardDetail;
