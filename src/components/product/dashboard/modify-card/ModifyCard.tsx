import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import useMembers from '@/hooks/useMembers';
import useCardImageUploader from '@/hooks/useCardImageUploader';
import useAssigneeSelector from '@/hooks/useAssigneeSelector';
import cardImageUpload from '@/lib/dashboard/cardImageUpload';
import DeadlineInput from '@/components/common/input/info-input/DeadlineInput';
import clsx from 'clsx';
import getColumns from '@/lib/dashboard/getColumns';
import putCard from '@/lib/dashboard/putCard';
import { GetColumnsResponse } from '@/type/column';
import AssigneeSection from '../create-card/AssigneeSection';
import TagManager from '../create-card/TagManager';
import DescriptionInput from '../create-card/DescriptionInput';
import CardImageInput from '../create-card/CardImageInput';
import styles from './ModifyCard.module.css';
import ModifyButtonSection from './ModifyButtonSection';
import ColumnTitleSection from './ColumnTitleSection';
import useColumnData from '@/hooks/useColumnData';

interface ModifyCardProps {
  closeModal: () => void;
  columnTitle: string;
  onUpdate: () => void;
}

export default function ModifyCard({
  closeModal,
  columnTitle,
  onUpdate,
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
  const [selectedColumnId, setSelectedColumnId] = useState<number>(null);
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
  const { columnData, setColumnData, fetchCards } =
    useColumnData(selectedColumnId);

  const handleTitleOptionClick = (columnsTitle: string, id: number) => {
    setSelectedColumnTitle(columnsTitle);
    setSelectedColumnId(id);
    setIsOtherDropdownOpen(false);
  };
  console.log(selectedColumnId);
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

      await putCard(putData, cardInfo.id);
      onUpdate();
      fetchCards(null, columnData.totalCount + 1, true); // size=1

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
          // isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}
