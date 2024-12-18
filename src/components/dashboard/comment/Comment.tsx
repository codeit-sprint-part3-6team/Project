import UserProfile from '@/components/common/userprofile/UserProfile';
import styles from '@/components/dashboard/comment/Comment.module.css';
import { RootState } from '@/redux/store';
import formatDate from '@/utils/formatDate';
import { useSelector } from 'react-redux';

interface CommentProps {
  authorId: number;
  nickname: string;
  profileImageUrl: string | null;
  updatedAt: string;
  content: string;
}

function Comment({
  authorId,
  nickname,
  profileImageUrl,
  updatedAt,
  content,
}: CommentProps) {
  const {
    user: { id },
  } = useSelector((state: RootState) => state.userInfo);
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
          <span className={styles.date}>{formatDate(updatedAt, true)}</span>
        </div>
        <div className={styles.content}>{content}</div>
        {id === authorId && (
          <div>
            <button type="button" className={styles.edit}>
              수정
            </button>
            <button type="button" className={styles.delete}>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
