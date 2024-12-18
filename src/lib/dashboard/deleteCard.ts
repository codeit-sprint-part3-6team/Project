import axios from '@/lib/instance';

const deleteCard = async (cardId: number) => {
  try {
    const response = await axios.delete(`/11-6/cards/${cardId}`);

    return response.data;
  } catch (error) {
    console.error('카드 삭제 실패:', error);
    throw error;
  }
};

export default deleteCard;
