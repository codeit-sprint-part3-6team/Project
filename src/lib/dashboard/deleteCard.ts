import axios from '@/lib/instance';

const deleteCard = async (cardId: number) => {
  try {
    await axios.delete(`/11-6/cards/${cardId}`);
  } catch (error) {
    console.error('카드 삭제 실패:', error);
    throw error;
  }
};

export default deleteCard;
