import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import useMembers from '@/hooks/useMembers';
import useCardImageUploader from '@/hooks/useCardImageUploader';
import useAssigneeSelector from '@/hooks/useAssigneeSelector';
import cardImageUpload from '@/lib/dashboard/cardImageUpload';
import DeadlineInput from '@/components/common/input/info-input/DeadlineInput';
import AssigneeSection from '../create-card/AssigneeSection';
import TagManager from '../create-card/TagManager';
import DescriptionInput from '../create-card/DescriptionInput';
import CardImageInput from '../create-card/CardImageInput';
import styles from './ModifyCard.module.css';
import ModifyButtonSection from './ModifyButtonSection';
import ColumnTitleSection from './ColumnTitleSection';
import clsx from 'clsx';
import { GetColumnsResponse } from '@/type/column';
import getColumns from '@/lib/dashboard/getColumns';
import putCard from '@/lib/dashboard/putCard';

interface ModifyCardProps {
  // imageUrl: string;
  // id: number;
  // title: string;
  // tags: string[];
  // dueDate: string;
  // nickname: string;
  // profileImage: string | null;
  closeModal: () => void;
  columnTitle: string;
}

export default function ModifyCard({
  closeModal,
  columnTitle,
}: ModifyCardProps) {
  const cardInfo = useSelector(
    (state: RootState) => state.cardInfo.cardDetailInfo,
  );
  const [title, setTitle] = useState(cardInfo?.title || '');
  const [description, setDescription] = useState(cardInfo?.description || '');
  const [formattedDate, setFormattedDate] = useState(cardInfo?.dueDate || null);
  const [tags, setTags] = useState(cardInfo?.tags || []);
  const [columns, setColumns] = useState<GetColumnsResponse | null>(null);
  const [selectedColumnTitle, setSelectedColumnTitle] = useState(columnTitle);
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { query } = useRouter();
  const dashboardId = Number(query.id);
  const { members } = useMembers({ teamId: '11-6', dashboardId });
  const { image, preview, handleImageChange } = useCardImageUploader(
    cardInfo?.imageUrl || null,
  );
  const {
    selectedMemberNickname,
    selectedMemberProfileImage,
    isDropdownOpen,
    handleToggle,
    handleOptionClick,
  } = useAssigneeSelector(cardInfo?.assignee || null);

  // 최초 입력값을 저장하기 위해 useRef 사용
  const initialValuesRef = useRef({
    columnTitle,
    members,
    title: cardInfo?.title || '',
    description: cardInfo?.description || '',
    tags: cardInfo?.tags || [],
    image: cardInfo?.imageUrl || null,
    dueDate: cardInfo?.dueDate || null,
  });

  useEffect(() => {
    // 최초 입력값과 현재 값을 비교하여 disabled 상태 설정
    const isChanged =
      title !== initialValuesRef.current.title ||
      description !== initialValuesRef.current.description ||
      tags.length !== initialValuesRef.current.tags.length ||
      String(image) !== initialValuesRef.current.image ||
      formattedDate !== initialValuesRef.current.dueDate ||
      selectedColumnTitle !== initialValuesRef.current.columnTitle;

    setIsDisabled(!isChanged);
  }, [
    title,
    description,
    tags,
    image,
    formattedDate,
    selectedMemberNickname,
    selectedColumnTitle,
  ]);

  const handleTitleOptionClick = (columnsTitle: string) => {
    setSelectedColumnTitle(columnsTitle);
    setIsOtherDropdownOpen(false);
  };

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

  const handleOtherDropdownToggle = () => {
    setIsOtherDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const data = await getColumns({ teamId: '11-6', dashboardId });
        setColumns(data);
      } catch (error) {
        console.error('Failed to fetch columns:', error);
      }
    };

    fetchColumns();
  }, [dashboardId]);

  // 생성 버튼 클릭시 함수
  const handleSubmit = async () => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await cardImageUpload(image, cardInfo.columnId);
      }

      const putData = {
        assigneeUserId: cardInfo.assignee.id,
        dashboardId,
        columnId: cardInfo.columnId,
        title,
        description,
        dueDate: formattedDate,
        tags,
        imageUrl,
      };
      await putCard(putData, cardInfo.id);

      closeModal();
    } catch (error) {
      console.error('handleSubmit Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles[`scrollable-content`]}>
        <section className={styles.section}>
          <p className={styles.title}>할 일 수정</p>
        </section>
        <section className={clsx(styles.section, styles[`first-section`])}>
          <ColumnTitleSection
            columns={columns}
            selectedColumnTitle={selectedColumnTitle}
            isDropdownOpen={isOtherDropdownOpen}
            onToggleDropdown={handleOtherDropdownToggle}
            onSelectMember={handleTitleOptionClick}
          />
          <AssigneeSection
            members={members}
            selectedMemberNickname={selectedMemberNickname}
            selectedMemberProfileImage={selectedMemberProfileImage}
            isDropdownOpen={isDropdownOpen}
            onToggleDropdown={handleToggle}
            onSelectMember={handleOptionClick}
          />
        </section>
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
          <DeadlineInput
            onDateChange={handleDateChange}
            initialDate={formattedDate}
          />
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
          <CardImageInput preview={preview} onImageChange={handleImageChange} />
        </section>
        <ModifyButtonSection
          onCancel={closeModal}
          onSubmit={handleSubmit}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}
