import React, { useEffect, useState } from 'react';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import TitleTagInput from '@/components/common/input/info-input/TitleTagInput';
import DeadlineInput from '@/components/common/input/info-input/DeadlineInput';
import CDSButton from '@/components/common/button/CDSButton';
import cardImageUpload from '@/lib/dashboard/CardImageUpload';
import CardImageInput from './CardImageInput';
import styles from './CreateCard.module.css';
import getMembers from '@/lib/dashboard/getMembers';
import { useRouter } from 'next/router';
import postCard from '@/lib/dashboard/postCard';

interface CreateCardProps {
  targetId: number;
  onClose: () => void;
}

interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export default function CreateCard({ targetId, onClose }: CreateCardProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberNickname, setSelectedMemberNickname] =
    useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { query } = useRouter();
  const dashboardId = Number(query.id);

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

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') return;
    if (tags.includes(e.target.value.trim())) return; // 중복 태그 방지
    setTags((prevTags) => [...prevTags, e.target.value.trim()]);
    e.target.value = ''; // 입력 필드 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputElement = e.target as HTMLInputElement;
      handleTagInput({
        target: inputElement,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers({ teamId: `11-6`, dashboardId });
        setMembers(data.members);
      } catch (error) {
        console.error('멤버 데이터 가져오기 실패:', error);
      }
    };
    fetchMembers();
  }, []);

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
        return; // 추가 처리 없이 함수를 종료합니다.
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
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
          <section className={styles.section}>
            <p className={styles.topic}>담당자</p>
            <input
              type="text"
              list="memberList"
              placeholder="이름을 입력해 주세요."
              className={styles[`name-select`]}
              onChange={(e) => setSelectedMemberNickname(e.target.value)}
            />
            <datalist id="memberList">
              {members.map((member) => (
                <option key={member.userId} value={member.nickname}>
                  {member.nickname}
                </option>
              ))}
            </datalist>
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
            <TitleTagInput
              label="태그"
              placeholder="입력 후 Enter"
              onKeyDown={handleKeyDown}
              required
            />
            <div className={styles.tags}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  className={styles.tag}
                  onDoubleClick={() => handleTagRemove(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <p className={styles.topic}>이미지</p>
            <CardImageInput
              preview={preview}
              onImageChange={handleImageChange}
            />
          </section>
          <section className={styles[`button-box`]}>
            <CDSButton btnType="modal" onClick={handleCancelClick}>
              취소
            </CDSButton>
            <CDSButton btnType="modal_colored" onClick={handleSubmit}>
              생성
            </CDSButton>
          </section>
        </div>
      </div>
    </OverlayContainer>
  );
}
