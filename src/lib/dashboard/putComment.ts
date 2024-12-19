import axios from '@/lib/instance';
import { Comment, PutCommentParams } from '@/type/comment';

const putComment = async ({
  commentId,
  content,
}: PutCommentParams): Promise<Comment> => {
  try {
    const response = await axios.put(`/11-6/comments/${commentId}`, {
      content,
    });

    if (response.status === 200) return response.data;
    throw new Error('댓글 수정 실패');
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
};

export default putComment;
