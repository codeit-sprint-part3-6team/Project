import UserProfile from '@/components/common/userprofile/UserProfile';
import styles from '@/components/dashboard/comment/Comment.module.css';
import { RootState } from '@/redux/store';
import formatDate from '@/utils/formatDate';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

interface CommentProps {
  commentId: number;
  authorId: number;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  content: string;
  removeComment: (commentId: number) => void;
  updateComment: (commentId: number, newContent: string) => void;
}

function Comment({
  commentId,
  authorId,
  nickname,
  profileImageUrl,
  createdAt,
  content,
  removeComment,
  updateComment,
}: CommentProps) {
  const {
    user: { id },
  } = useSelector((state: RootState) => state.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    if (editedContent.trim() !== content) {
      updateComment(commentId, editedContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content); // 수정 취소 시 원래 내용으로 되돌리기
    setIsEditing(false);
  };

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
      <div className={styles.wrap}>
        <div className={styles['title-section']}>
          <span className={styles.nickname}>{nickname}</span>
          <span className={styles.date}>{formatDate(createdAt, true)}</span>
        </div>
        {isEditing ? (
          <div className={styles['content-edit']}>
            <textarea
              className={styles['content-textarea']}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button
              type="button"
              className={styles['btn-cancel']}
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              type="button"
              className={styles['btn-save']}
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        ) : (
          <div className={styles.content}>{content}</div>
        )}
        {!isEditing && id === authorId && (
          <div>
            <button
              type="button"
              className={styles.edit}
              onClick={() => setIsEditing(true)}
            >
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
