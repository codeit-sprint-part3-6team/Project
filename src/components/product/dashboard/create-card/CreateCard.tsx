import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import DeadlineInput from '@/components/common/input/info-input/DeadlineInput';
import cardImageUpload from '@/lib/dashboard/cardImageUpload';
import postCard from '@/lib/dashboard/postCard';
import useMembers from '@/hooks/useMembers';
import useCardImageUploader from '@/hooks/useCardImageUploader';
import useAssigneeSelector from '@/hooks/useAssigneeSelector';
import CardImageInput from './CardImageInput';
import TagManager from './TagManager';
import ButtonSection from './ButtonSection';
import AssigneeSection from './AssigneeSection';
import DescriptionInput from './DescriptionInput';
import { toast } from 'react-toastify';
import styles from './CreateCard.module.css';

interface CreateCardProps {
  columnId: number;
  onClose: () => void;
  onUpdate: () => void;
}

export default function CreateCard({
  columnId,
  onClose,
  onUpdate,
}: CreateCardProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { query } = useRouter();
  const dashboardId = Number(query.id);
  const { members } = useMembers({ teamId: '11-6', dashboardId });
  const { image, preview, handleImageChange } = useCardImageUploader(null);
  const {
    selectedMemberNickname,
    selectedMemberProfileImage,
    isDropdownOpen,
    handleToggle,
    handleOptionClick,
  } = useAssigneeSelector();

  const handleDateChange = (date: string) => {
    setFormattedDate(date);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    // 모든 조건이 만족하면 disabled를 false로 설정
    if (
      selectedMemberNickname.trim() &&
      title.trim() &&
      description.trim() &&
      tags.length > 0 &&
      image &&
      formattedDate
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, description, tags, image, formattedDate, selectedMemberNickname]);

  // 생성 버튼 클릭시 함수
  const handleSubmit = async () => {
    if (isSubmitting) {
      toast.error('이미 요청을 보내고 있습니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (image) {
        imageUrl = await cardImageUpload(image, columnId);
      }

      const selectedMember = members.find(
        (member) => member.nickname === selectedMemberNickname,
      );

      if (!selectedMember) {
        toast.error('담당자를 선택해주세요.');
        return;
      }

      const createData = {
        assigneeUserId: selectedMember.userId,
        dashboardId,
        columnId,
        title,
        description,
        dueDate: formattedDate,
        tags,
        imageUrl,
      };
      await postCard(createData);
      toast.success('할 일 카드가 생성되었습니다.');
      onUpdate();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <OverlayContainer onClose={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles[`scrollable-content`]}>
          <section className={styles.section}>
            <p className={styles.title}>할 일 생성</p>
          </section>
          <AssigneeSection
            members={members}
            selectedMemberNickname={selectedMemberNickname}
            selectedMemberProfileImage={selectedMemberProfileImage}
            isDropdownOpen={isDropdownOpen}
            onToggleDropdown={handleToggle}
            onSelectMember={handleOptionClick}
          />
          <section className={styles.section}>
            <TitleTagInput
              label="제목"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={handleTitleChange}
              required
            />
          </section>
          <DescriptionInput
            value={description}
            onChange={handleDescriptionChange}
          />
          <section className={styles.section}>
            <DeadlineInput onDateChange={handleDateChange} initialDate={null} />
          </section>
          <section className={styles.section}>
            <TagManager
              tags={tags}
              onAddTag={(tag) => setTags((prev) => [...prev, tag])}
              onRemoveTag={(tag) =>
                setTags((prev) => prev.filter((t) => t !== tag))
              }
            />
          </section>
          <section className={styles.section}>
            <p className={styles.topic}>이미지</p>
            <CardImageInput
              preview={preview}
              onImageChange={handleImageChange}
            />
          </section>
          <ButtonSection
            onCancel={handleCancelClick}
            onSubmit={handleSubmit}
            isDisabled={isDisabled || isSubmitting}
          />
        </div>
      </div>
    </OverlayContainer>
  );
}
