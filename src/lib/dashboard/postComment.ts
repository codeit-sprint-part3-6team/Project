import axios from '@/lib/instance';
import { Comment, PostCommentParams } from '@/type/comment';

const postComment = async ({
  content,
  cardId,
  columnId,
  dashboardId,
}: PostCommentParams): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>('/11-6/comments/', {
      content,
      cardId,
      columnId,
      dashboardId,
    });

    return response.data;
  } catch (error) {
    console.error('댓글 추가 실패:', error);
    throw error;
  }
};

export default postComment;
