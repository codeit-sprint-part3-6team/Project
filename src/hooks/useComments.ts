import { useState } from 'react';
import { Comment as CommentType, GetCommentsResponse } from '@/type/comment';
import postComment from '@/lib/dashboard/postComment';
import getComments from '@/lib/dashboard/getComments';
import deleteComment from '@/lib/dashboard/deleteComment';
import putComment from '@/lib/dashboard/putComment';
import { toast } from 'react-toastify';

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
    setIsSubmitting(true);
    try {
      const newCommentsResponse = await getComments({ cardId, cursorId });
      setCommentsResponse((prev) => ({
        ...newCommentsResponse,
        comments: [...(prev?.comments || []), ...newCommentsResponse.comments],
      }));
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setCommentsResponse((prev) => ({
        ...prev,
        comments:
          prev?.comments.filter((comment) => comment.id !== commentId) || [],
      }));
      toast.success('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const updateComment = async (commentId: number, newContent: string) => {
    try {
      const updatedComment = await putComment({
        commentId,
        content: newContent,
      });

      setCommentsResponse((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, content: updatedComment.content }
                  : comment,
              ),
            }
          : null,
      );
      toast.success('댓글이 수정되었습니다.');
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  return {
    commentsResponse,
    addComment,
    loadMoreComments,
    removeComment,
    updateComment,
    isSubmitting,
  };
};

export default useComments;
