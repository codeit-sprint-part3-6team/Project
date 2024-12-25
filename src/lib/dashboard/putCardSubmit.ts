import cardImageUpload from '@/lib/dashboard/cardImageUpload';
import putCard from '@/lib/dashboard/putCard';
import { setCardInfo } from '@/redux/cardSlice';

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
    setInitialData(initialData);
    await onUpdate();
    await closeModal();
    alert('카드가 수정되었습니다.');
  } catch (error) {
    console.error('handleSubmit Error:', error);
  }
};

export default putCardSubmit;
