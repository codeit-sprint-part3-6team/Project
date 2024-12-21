import { useState, useEffect } from 'react';
import styles from '@/components/common/modal/detail-cards/DetailCardModal.module.css';
import Dropdown from '@/components/common/dropdown/Dropdown';
import CloseIcon from 'public/ic/ic_x.svg';
import KebabIcon from 'public/ic/ic_kebab.svg';
import getCardDetail from '@/lib/dashboard/getCardDetail';
import { Card, GetCardsResponse } from '@/type/card';
import CardImage from '@/components/dashboard/card/CardImage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setCardInfo } from '@/redux/cardSlice';
import deleteCard from '@/lib/dashboard/deleteCard';
import AuthorSection from './AuthorSection';
import ChipSection from './ChipSection';
import CommentSection from './CommentSection';

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
    } catch (error) {
      console.error('데이터 요청 실패:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cardId]);

  if (!card) return null;

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
      <AuthorSection card={card} />
      <div className={styles['content-section']}>
        <ChipSection
          columnTitle={columnTitle}
          tags={card.tags}
          cardId={cardId}
        />
        <p className={styles.description}>{card.description}</p>
        <CardImage
          image={card.imageUrl}
          name={`${card.title} 이미지`}
          className={styles['card-image']}
        />
        <CommentSection
          cardId={cardId}
          columnId={card.columnId}
          dashboardId={card.dashboardId}
        />
      </div>
    </div>
  );
}

export default DetailCardModal;
