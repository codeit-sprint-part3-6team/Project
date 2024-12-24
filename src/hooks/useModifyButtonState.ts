import { useState, useCallback } from 'react';

interface UseButtonStateProps {
  title: string;
  description: string;
  formattedDate: string | null;
  tags: string[];
  selectedColumnTitle: string;
  preview: string | null;
  selectedMemberNickname: string;
  initialData: {
    title: string;
    description: string;
    dueDate: string | null;
    tags: string[];
    columnTitle: string;
    assigneeNickname: string;
  };
  cardInfoImageUrl: string | null;
}

export default function useButtonState({
  title,
  description,
  formattedDate,
  tags,
  selectedColumnTitle,
  preview,
  selectedMemberNickname,
  initialData,
  cardInfoImageUrl,
}: UseButtonStateProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const checkIfModified = useCallback(() => {
    const isDataModified =
      title !== initialData.title ||
      description !== initialData.description ||
      formattedDate !== initialData.dueDate ||
      tags.length !== initialData.tags.length ||
      !tags.every((tag, index) => tag === initialData.tags[index]) ||
      selectedColumnTitle !== initialData.columnTitle ||
      preview !== cardInfoImageUrl ||
      selectedMemberNickname !== initialData.assigneeNickname;

    setIsDisabled(!isDataModified);
  }, [
    title,
    description,
    formattedDate,
    tags,
    selectedColumnTitle,
    preview,
    selectedMemberNickname,
    cardInfoImageUrl,
    initialData,
  ]);

  return {
    isDisabled,
    checkIfModified,
  };
}
