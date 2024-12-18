import axios from '@/lib/instance';
import { GetCommentsParmas, GetCommentsResponse } from '@/type/comment';

const getComments = async ({
  size = 3,
  cursorId = null,
  cardId,
}: GetCommentsParmas): Promise<GetCommentsResponse> => {
  try {
    const response = await axios.get(`/11-6/comments`, {
      params: {
        size,
        cursorId,
        cardId,
      },
    });

    if (response.status === 200) return response.data;
    throw new Error('댓글 목록을 불러오는데 실패했습니다.');
  } catch (error) {
    console.error('댓글 목록 조회 실패: ', error);
    throw error;
  }
};

export default getComments;
