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
import styles from './CreateCard.module.css';

interface ModifyCardProps {
  targetId: number;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ModifyCard({
  targetId,
  onClose,
  onUpdate,
}: ModifyCardProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const { query } = useRouter();
  const dashboardId = Number(query.id);
  const { members } = useMembers({ teamId: '11-6', dashboardId });
  const { image, preview, handleImageChange } = useCardImageUploader();
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
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await cardImageUpload(image, targetId);
      }

      const selectedMember = members.find(
        (member) => member.nickname === selectedMemberNickname,
      );

      if (!selectedMember) {
        alert('담당자를 선택해주세요.');
        return;
      }

      const createData = {
        assigneeUserId: selectedMember.userId,
        dashboardId,
        columnId: targetId,
        title,
        description,
        dueDate: formattedDate,
        tags,
        imageUrl,
      };
      await postCard(createData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('handleSubmit Error:', error);
    }
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <OverlayContainer>
      <div className={styles.container}>
        <div className={styles[`scrollable-content`]}>
          <section className={styles.section}>
            <p className={styles.title}>할 일 수정</p>
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
            <DeadlineInput onDateChange={handleDateChange} />
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
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </OverlayContainer>
  );
}
