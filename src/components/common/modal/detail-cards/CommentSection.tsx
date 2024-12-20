import { useCallback, useEffect, useState } from 'react';
import styles from '@/components/common/modal/detail-cards/CommentSection.module.css';
import Comment from '@/components/dashboard/comment/Comment';
import useComments from '@/hooks/useComments';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface CommentSectionProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

function CommentSection({
  cardId,
  columnId,
  dashboardId,
}: CommentSectionProps) {
  const {
    commentsResponse,
    addComment,
    loadMoreComments,
    removeComment,
    updateComment,
    isSubmitting,
  } = useComments(cardId, null);
  const [newComment, setNewComment] = useState('');

  const handleObserver = useCallback(
    async ([entry]) => {
      if (entry.isIntersecting && commentsResponse?.cursorId) {
        loadMoreComments(commentsResponse.cursorId);
      }
    },
    [commentsResponse?.cursorId, loadMoreComments],
  );

  const endPoint = useIntersectionObserver(handleObserver);

  useEffect(() => {
    loadMoreComments();
  }, []);

  if (!commentsResponse) return null;

  return (
    <>
      <div className={styles['comment-input-section']}>
        <label htmlFor="comment" className={styles['comment-label']}>
          댓글
        </label>
        <textarea
          className={styles['comment-input']}
          name="comment"
          id="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글 작성하기"
        />
        <button
          type="button"
          className={styles['btn-add-comment']}
          onClick={() => {
            addComment(newComment, columnId, dashboardId);
            setNewComment('');
          }}
          disabled={isSubmitting || !newComment.trim()}
        >
          입력
        </button>
      </div>
      <div className="comment-section">
        {commentsResponse.comments.map(
          ({
            id: commentId,
            author: { id: authorId, nickname, profileImageUrl },
            createdAt,
            content,
          }) => (
            <Comment
              key={`comment_${commentId}`}
              commentId={commentId}
              profileImageUrl={profileImageUrl}
              authorId={authorId}
              nickname={nickname}
              createdAt={createdAt}
              content={content}
              removeComment={removeComment}
              updateComment={updateComment}
            />
          ),
        )}
      </div>
      {commentsResponse.cursorId && (
        <div ref={endPoint} className={styles['end-point']} />
      )}
    </>
  );
}

export default CommentSection;
