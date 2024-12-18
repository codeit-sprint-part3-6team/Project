import UserProfile from '@/components/common/userprofile/UserProfile';
import styles from '@/components/dashboard/comment/Comment.module.css';
import useComments from '@/hooks/useComments';
import deleteComment from '@/lib/dashboard/deleteComment';
import { RootState } from '@/redux/store';
import formatDate from '@/utils/formatDate';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

interface CommentProps {
  commentId: number;
  authorId: number;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  content: string;
  removeComment: (commentId: number) => void;
}

function Comment({
  commentId,
  authorId,
  nickname,
  profileImageUrl,
  createdAt,
  content,
  removeComment,
}: CommentProps) {
  const {
    user: { id },
  } = useSelector((state: RootState) => state.userInfo);

  const handleEdit = () => {};

  const handleDelete = useCallback(() => {
    removeComment(commentId);
  }, [removeComment, commentId]);

  return (
    <div className={styles.comment}>
      <UserProfile
        type="todo-detail"
        profileImageUrl={profileImageUrl}
        onlyImg
        nickname={nickname}
      />
      <div>
        <div className={styles['title-section']}>
          <span className={styles.nickname}>{nickname}</span>
          <span className={styles.date}>{formatDate(createdAt, true)}</span>
        </div>
        <div className={styles.content}>{content}</div>
        {id === authorId && (
          <div>
            <button type="button" className={styles.edit} onClick={handleEdit}>
              수정
            </button>
            <button
              type="button"
              className={styles.delete}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
