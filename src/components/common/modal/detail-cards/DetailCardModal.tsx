import styles from '@/components/common/modal/detail-cards/DetailCardModal.module.css';
import Dropdown from '@/components/common/dropdown/Dropdown';
import Chip from '@/components/common/chip/Chip';
import CloseIcon from 'public/ic/ic_x.svg';
import KebabIcon from 'public/ic/ic_kebab.svg';
import { useCallback, useEffect, useState } from 'react';
import getCardDetail from '@/lib/dashboard/getCardDetail';
import { Card, GetCardsResponse } from '@/type/card';
import CardImage from '@/components/dashboard/card/CardImage';
import Comment from '@/components/dashboard/comment/Comment';
import formatDate from '@/utils/formatDate';
import UserProfile from '@/components/common/userprofile/UserProfile';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useComments from '@/hooks/useComments';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import deleteCard from '@/lib/dashboard/deleteCard';
import { setCardInfo } from '@/redux/cardSlice';

interface DetailCardModalProps {
  title: string;
  cardId: number;
  columnTitle: string;
  closeModal: () => void;
  setColumnData: React.Dispatch<React.SetStateAction<GetCardsResponse>>;
  openModifyModal: () => void;
}

function DetailCardModal({
  title,
  cardId,
  columnTitle,
  closeModal,
  setColumnData,
  openModifyModal,
}: DetailCardModalProps) {
  const {
    user: { id },
  } = useSelector((state: RootState) => state.userInfo);
  const [card, setCard] = useState<Card | null>(null);
  const {
    commentsResponse,
    addComment,
    loadMoreComments,
    removeComment,
    updateComment,
    isSubmitting,
  } = useComments(cardId, null);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  // 카드 삭제 함수
  const handleCardDelete = async () => {
    try {
      await deleteCard(cardId);
      alert('카드가 삭제되었습니다.');
      setColumnData((prev) => ({
        ...prev,
        cards: prev.cards.filter((columnCard) => columnCard.id !== cardId), // 삭제된 카드 제외
      }));
    } catch (error) {
      console.error('카드 삭제 오류:', error);
    }
  };

  const handleMenuClick = async (value: string) => {
    closeModal();
    if (value === 'edit') {
      openModifyModal();
    } else if (value === 'delete') {
      await handleCardDelete();
    }
  };

  const fetchData = async () => {
    try {
      const cardDetail = await getCardDetail({ cardId });
      setCard(cardDetail);
      dispatch(setCardInfo(cardDetail));
      loadMoreComments();
    } catch (error) {
      console.error('데이터 요청 실패:', error);
    }
  };

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
    fetchData();
  }, [cardId]);

  if (!card || !commentsResponse) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles['btn-section']}>
        {id === card.assignee.id && (
          <Dropdown
            menus={[
              { label: '수정하기', value: 'edit' },
              { label: '삭제하기', value: 'delete' },
            ]}
            onMenuClick={handleMenuClick}
          >
            <KebabIcon className={styles['icon-kebab']} />
          </Dropdown>
        )}
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
            onClick={() => {
              addComment(newComment, card.columnId, card.dashboardId);
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
      </div>
    </div>
  );
}

export default DetailCardModal;
