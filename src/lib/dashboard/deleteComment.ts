import axios from '@/lib/instance';

const deleteComment = async (commentId: number) => {
  try {
    await axios.delete(`/11-6/comments/${commentId}`);
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
};

export default deleteComment;
