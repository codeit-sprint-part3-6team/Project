import cardImageUpload from '@/lib/dashboard/cardImageUpload';
import putCard from '@/lib/dashboard/putCard';
import { setCardInfo } from '@/redux/cardSlice';
import { toast } from 'react-toastify';

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
  isSubmitting,
  setIsSubmitting,
}) => {
  if (isSubmitting) {
    toast.error('이미 요청을 보내고 있습니다.');
    return;
  }
  setIsSubmitting(true);

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
    toast.success('카드가 수정되었습니다.');
    await onUpdate();
    await closeModal();
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

export default putCardSubmit;
