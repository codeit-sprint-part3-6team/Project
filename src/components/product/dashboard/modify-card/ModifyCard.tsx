import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import putCardSubmit from '@/lib/dashboard/putCardSubmit';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import useMembers from '@/hooks/useMembers';
import useCardImageUploader from '@/hooks/useCardImageUploader';
import useAssigneeSelector from '@/hooks/useAssigneeSelector';
import DeadlineInput from '@/components/common/input/info-input/DeadlineInput';
import clsx from 'clsx';
import getColumns from '@/lib/dashboard/getColumns';
import useColumnData from '@/hooks/useColumnData';
import useButtonState from '@/hooks/useModifyButtonState';
import { GetColumnsResponse } from '@/type/column';
import CloseIcon from 'public/ic/ic_x.svg';
import TagManager from '../create-card/TagManager';
import DescriptionInput from '../create-card/DescriptionInput';
import CardImageInput from '../create-card/CardImageInput';
import styles from './ModifyCard.module.css';
import ModifyButtonSection from './ModifyButtonSection';
import ColumnTitleSection from './ColumnTitleSection';
import AssigneeSection from '../create-card/AssigneeSection';

interface ModifyCardProps {
  closeModal: () => void;
  columnTitle: string;
  columnId: number;
  onUpdate: () => void;
}

export default function ModifyCard({
  closeModal,
  columnTitle,
  columnId,
  onUpdate,
}: ModifyCardProps) {
  const dispatch = useDispatch();
  const cardInfo = useSelector(
    (state: RootState) => state.cardInfo.cardDetailInfo,
  );
  const [title, setTitle] = useState<string>(cardInfo?.title || '');
  const [description, setDescription] = useState<string>(
    cardInfo?.description || '',
  );
  const [formattedDate, setFormattedDate] = useState<string>(
    cardInfo?.dueDate || null,
  );
  const [tags, setTags] = useState<string[]>(cardInfo?.tags || []);
  const [columnsInfo, setColumnsInfo] = useState<GetColumnsResponse | null>(
    null,
  );
  const [selectedColumnTitle, setSelectedColumnTitle] =
    useState<string>(columnTitle);
  const [selectedColumnId, setSelectedColumnId] = useState<number>(columnId);
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] =
    useState<boolean>(false);
  const { query } = useRouter();
  const dashboardId = Number(query.id);
  const { members } = useMembers({ teamId: '11-6', dashboardId });
  const [initialData, setInitialData] = useState({
    title: cardInfo?.title || '',
    description: cardInfo?.description || '',
    dueDate: cardInfo?.dueDate || null,
    tags: cardInfo?.tags || [],
    columnTitle,
    assigneeNickname: cardInfo?.assignee?.nickname || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const { fetchCards } = useColumnData(columnId);

  // 컬럼 정보 가져오기
  useEffect(() => {
    const fetchColumnsInfo = async () => {
      try {
        const data = await getColumns({
          teamId: '11-6',
          dashboardId,
        });
        setColumnsInfo(data);
      } catch (error) {
        console.error('Failed to fetch columns:', error);
      }
    };

    fetchColumnsInfo();
  }, [dashboardId]);

  // 버튼 활성화 상태 관리
  const { isDisabled, checkIfModified } = useButtonState({
    title,
    description,
    formattedDate,
    tags,
    selectedColumnTitle,
    preview,
    selectedMemberNickname,
    initialData,
    cardInfoImageUrl: cardInfo?.imageUrl || null,
  });

  // 입력값 변경 여부 체크
  useEffect(() => {
    checkIfModified();
  }, [
    title,
    description,
    formattedDate,
    tags,
    selectedColumnTitle,
    preview,
    selectedMemberNickname,
    cardInfo?.imageUrl,
    initialData,
    checkIfModified,
  ]);

  const handleTitleOptionClick = (columnsTitle: string, id: number) => {
    setSelectedColumnTitle(columnsTitle);
    setSelectedColumnId(id);
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
    if (selectedColumnId) {
      fetchCards({ reset: true });
    }
  }, [selectedColumnId]);

  const handleSubmit = () => {
    putCardSubmit({
      image,
      cardInfo,
      members,
      selectedMemberNickname,
      columns: columnsInfo,
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
    });
  };

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={`${styles[`scrollable-content`]} custom-scroll`}>
        <section className={clsx(styles.section, styles[`header-container`])}>
          <div className={styles['header-section']}>
            <p className={styles.title}>할 일 수정</p>
            <button
              type="button"
              className={styles['btn-close']}
              onClick={closeModal}
            >
              <CloseIcon className={styles['icon-close']} />
            </button>
          </div>
        </section>
        <section className={clsx(styles.section, styles[`first-section`])}>
          <ColumnTitleSection
            columns={columnsInfo}
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
          isDisabled={isDisabled || isSubmitting}
        />
      </div>
    </div>
  );
}
