import styles from '@/components/common/modal/detail-cards/DetailCardModal.module.css';
import Dropdown from '@/components/common/dropdown/Dropdown';
import Chip from '@/components/common/chip/Chip';
import CloseIcon from 'public/ic/ic_x.svg';
import KebabIcon from 'public/ic/ic_kebab.svg';
import { useCallback, useEffect, useState } from 'react';
import getCardDetail from '@/lib/dashboard/getCardDetail';
import { Card } from '@/type/card';
import CardImage from '@/components/dashboard/card/CardImage';
import getComments from '@/lib/dashboard/getComments';
import { Comment as CommentType, GetCommentsResponse } from '@/type/comment';
import Comment from '@/components/dashboard/comment/Comment';
import formatDate from '@/utils/formatDate';
import UserProfile from '@/components/common/userprofile/UserProfile';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import postComment from '@/lib/dashboard/postComment';

interface DetailCardModalProps {
  cardId: number;
  columnTitle: string;
  closeModal: () => void;
}

function DetailCardModal({
  cardId,
  columnTitle,
  closeModal,
}: DetailCardModalProps) {
  const [card, setCard] = useState<Card | null>(null);
  const [commentsResponse, setCommentsResponse] =
    useState<GetCommentsResponse | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMenuClick = (value: string) => {
    closeModal();
    if (value === 'edit') alert('수정하기 모달 오픈');
    else if (value === 'delete') console.log('delete');
  };

  const fetchData = async () => {
    try {
      const [cardDetail, comments] = await Promise.all([
        getCardDetail({ cardId }),
        getComments({ cardId }),
      ]);
      setCard(cardDetail);
      setCommentsResponse(comments);
    } catch (error) {
      console.error('데이터 요청 실패:', error);
    }
  };

  const handleObserver = useCallback(
    async ([entry]) => {
      if (entry.isIntersecting && commentsResponse.cursorId) {
        try {
          const newCommentsResponse = await getComments({
            cardId,
            cursorId: commentsResponse.cursorId,
          });

          setCommentsResponse((prev) => ({
            ...newCommentsResponse,
            comments: [
              ...(prev.comments || []),
              ...newCommentsResponse.comments,
            ],
          }));
        } catch (error) {
          console.error('댓글을 불러오는데 실패했습니다:', error);
        }
      }
    },
    [commentsResponse?.cursorId, cardId],
  );

  const endPoint = useIntersectionObserver(handleObserver);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const addedComment: CommentType = await postComment({
        content: newComment,
        cardId,
        columnId: card.columnId,
        dashboardId: card.dashboardId,
      });

      setCommentsResponse((prev) => ({
        ...prev,
        comments: [...(prev?.comments || []), addedComment],
      }));

      setNewComment('');
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cardId]);

  if (!card || !commentsResponse) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새로운 일정 관리 Taskify</h2>
      <div className={styles['btn-section']}>
        <Dropdown
          menus={[
            { label: '수정하기', value: 'edit' },
            { label: '삭제하기', value: 'delete' },
          ]}
          onMenuClick={handleMenuClick}
        >
          <KebabIcon className={styles['icon-kebab']} />
        </Dropdown>
        <button
          type="button"
          className={styles['btn-close']}
          onClick={closeModal}
        >
          <CloseIcon className={styles['icon-close']} />
        </button>
      </div>
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
      <div className={styles['content-section']}>
        <div className={styles['chip-section']}>
          <div className={styles.status}>
            <Chip chipType="status">{columnTitle}</Chip>
          </div>
          <span className={styles.bar} />
          <div className={styles.tags}>
            {card.tags.map((tag) => (
              <Chip key={`${cardId}_tag_${tag}`} chipType="tag">
                {tag}
              </Chip>
            ))}
          </div>
        </div>
        <p className={styles.description}>{card.description}</p>
        <CardImage
          image={card.imageUrl}
          name={`${card.title} 이미지`}
          className={styles['card-image']}
        />
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
            onClick={handleAddComment}
            disabled={isSubmitting || !newComment.trim()}
          >
            입력
          </button>
        </div>
        <div className="comment-section">
          {commentsResponse.comments.map(
            ({
              id,
              author: { nickname, profileImageUrl },
              updatedAt,
              content,
            }) => (
              <Comment
                key={`comment_${id}`}
                profileImageUrl={profileImageUrl}
                nickname={nickname}
                updatedAt={updatedAt}
                content={content}
              />
            ),
          )}
        </div>
        {commentsResponse.cursorId && (
          <div ref={endPoint} className={styles['end-point']} />
        )}
      </div>
    </div>
  );
}

export default DetailCardModal;
