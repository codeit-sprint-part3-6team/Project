import styles from '@/components/common/modal/detail-cards/AuthorSection.module.css';
import UserProfile from '@/components/common/userprofile/UserProfile';
import { Card } from '@/type/card';
import formatDate from '@/utils/formatDate';

interface AUthorSectionProps {
  card: Card;
}

function AuthorSection({ card }: AUthorSectionProps) {
  return (
    <div className={styles['author-section']}>
      <div>
        <div className={styles['author-title']}>담당자</div>
        <UserProfile
          type="todo-detail"
          profileImageUrl={card.assignee.profileImageUrl}
          nickname={card.assignee.nickname}
        />
      </div>
      <div>
        <div className={styles['author-title']}>마감일</div>
        <span className={styles['author-content']}>
          {formatDate(card.dueDate, true)}
        </span>
      </div>
    </div>
  );
}

export default AuthorSection;
