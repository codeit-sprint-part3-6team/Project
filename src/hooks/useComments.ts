import { useState } from 'react';
import { Comment as CommentType, GetCommentsResponse } from '@/type/comment';
import postComment from '@/lib/dashboard/postComment';
import getComments from '@/lib/dashboard/getComments';

const useComments = (
  cardId: number,
  initialComments: GetCommentsResponse | null,
) => {
  const [commentsResponse, setCommentsResponse] =
    useState<GetCommentsResponse | null>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addComment = async (
    content: string,
    columnId: number,
    dashboardId: number,
  ) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const addedComment: CommentType = await postComment({
        content,
        cardId,
        columnId,
        dashboardId,
      });
      setCommentsResponse((prev) => ({
        ...prev,
        comments: [addedComment, ...(prev?.comments || [])],
      }));
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMoreComments = async (cursorId?: number) => {
    try {
      const newCommentsResponse = await getComments({ cardId, cursorId });
      setCommentsResponse((prev) => ({
        ...newCommentsResponse,
        comments: [...(prev?.comments || []), ...newCommentsResponse.comments],
      }));
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다:', error);
    }
  };

  return { commentsResponse, addComment, loadMoreComments, isSubmitting };
};

export default useComments;
