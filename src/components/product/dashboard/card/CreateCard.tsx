import React, { useState } from 'react';
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
import styles from './CreateCard.module.css';
import TagManager from './TagManager';
import ButtonSection from './ButtonSection';
import AssigneeSection from './AssigneeSection';

interface CreateCardProps {
  targetId: number;
  onClose: () => void;
}

export default function CreateCard({ targetId, onClose }: CreateCardProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

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

  // 생성 버튼 클릭시 함수
  const handleSubmit = async () => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await cardImageUpload(image, targetId);
      }

      // 선택된 멤버를 찾아 userId를 설정
      const selectedMember = members.find(
        (member) => member.nickname === selectedMemberNickname,
      );

      // selectedMember가 없을 경우 오류 처리
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
      const newCard = await postCard(createData);
      console.log(newCard);
      onClose(); // 모달 닫기
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
          <section className={styles.section}>
            <div className={styles[`topic-box`]}>
              <p className={styles.topic}>설명</p>
              <p className={styles.require}>*</p>
            </div>
            <textarea
              className={styles[`description-input`]}
              placeholder="설명을 입력해 주세요."
              value={description}
              onChange={handleDescriptionChange}
            />
          </section>
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
          <ButtonSection onCancel={handleCancelClick} onSubmit={handleSubmit} />
        </div>
      </div>
    </OverlayContainer>
  );
}
