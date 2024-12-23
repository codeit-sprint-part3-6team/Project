import cardImageUpload from '@/lib/dashboard/cardImageUpload';
import putCard from '@/lib/dashboard/putCard';

import { resetCardList } from '@/redux/cardListSlice';

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
  fetchCards,
  columnData,
  fetchColumns,
  setColumnData,
  dispatch,
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
    setColumnData((prev) => ({
      ...prev,
      cards: [...(prev.cards || []), result],
    }));
    await fetchCards({
      size: columnData.totalCount + 1,
      reset: true,
    });

    await onUpdate();
    await closeModal();
  } catch (error) {
    console.error('handleSubmit Error:', error);
  }
};

export default putCardSubmit;
