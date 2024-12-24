import cardImageUpload from '@/lib/dashboard/cardImageUpload';
import putCard from '@/lib/dashboard/putCard';
import { setCardInfo } from '@/redux/cardSlice';
import axios from '@/lib/instance';
import { setCardList } from '@/redux/cardListSlice';

const putCardSubmit = async ({
  image,
  cardInfo,
  members,
  selectedMemberNickname,
  columns,
  selectedColumnTitle,
  title,
  description,
  formattedDate,
  tags,
  dashboardId,
  onUpdate,
  closeModal,
  columnData,
  dispatch,
  initialData,
  setInitialData,
}) => {
  try {
    let imageUrl = cardInfo?.imageUrl || null;
    if (image) {
      imageUrl = await cardImageUpload(image, cardInfo.columnId);
    }

    const selectedMember = members.find(
      (member) => member.nickname === selectedMemberNickname,
    );

    const selectedColumn = columns.data.find(
      (column) => column.title === selectedColumnTitle,
    );

    const putData = {
      assigneeUserId: selectedMember.userId,
      dashboardId,
      columnId: selectedColumn.id,
      title,
      description,
      dueDate: formattedDate,
      tags,
      imageUrl,
    };
    const result = await putCard(putData, cardInfo.id);
    dispatch(setCardInfo(result)); // 수정한 카드의 데이터 리덕스에 담아

    // 수정 전 컬럼의 카드 리스트 가져와
    const prevResponse = await axios.get(`/11-6/cards/`, {
      params: {
        size: 4,
        cursorId: null,
        columnId: cardInfo.columnId,
      },
    });
    console.log('prevResponse:', prevResponse.data);
    // 수정 후 컬럼의 카드 리스트 가져와
    const response = await axios.get(`/11-6/cards/`, {
      params: {
        size: columnData.totalCount + 1,
        cursorId: null,
        columnId: selectedColumn.id,
      },
    });

    dispatch(setCardList(response.data)); // 수정 후 컬럼의 카드 리스트 리덕스에 담아
    setInitialData(initialData);
    await onUpdate(); // fetchCards({ size: columnData.totalCount + 1, reset: true }); 로 카드 리스트 초기화
    await closeModal();
    alert('카드가 수정되었습니다.');
    window.location.reload(); // 일단 새로고침
  } catch (error) {
    console.error('handleSubmit Error:', error);
  }
};

export default putCardSubmit;
