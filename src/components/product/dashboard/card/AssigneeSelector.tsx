import React, { useState } from 'react';
import UserProfile from '@/components/common/userprofile/UserProfile';
import ToggleButton from 'public/ic/ic_dropdown.svg';
import styles from './AssigneeSelector.module.css';

interface Member {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

interface AssigneeSelectorProps {
  members: Member[];
  selectedNickname: string;
  selectedProfileImage: string;
  onSelect: (nickname: string, profileImageUrl: string) => void;
}

export default function AssigneeSelector({
  members,
  selectedNickname,
  selectedProfileImage,
  onSelect,
}: AssigneeSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOptionClick = (nickname: string, profileImageUrl: string) => {
    onSelect(nickname, profileImageUrl);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles['input-box']}>
      {selectedNickname ? (
        <div className={styles['name-select']}>
          <UserProfile
            type="todo-create"
            nickname={selectedNickname}
            profileImageUrl={selectedProfileImage}
            onlyImg={false}
          />
        </div>
      ) : (
        <input
          type="text"
          value={selectedNickname}
          disabled
          placeholder="이름을 선택해 주세요."
          className={styles['name-select']}
        />
      )}
      <ToggleButton
        className={styles['toggle-button']}
        width={26}
        height={26}
        onClick={handleToggle}
      />
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {members.map((member) => (
            <div
              key={member.userId}
              className={styles.option}
              role="button"
              tabIndex={0}
              onClick={() =>
                handleOptionClick(member.nickname, member.profileImageUrl)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionClick(member.nickname, member.profileImageUrl);
                }
              }}
            >
              <UserProfile
                type="todo-create"
                nickname={member.nickname}
                profileImageUrl={member.profileImageUrl}
                onlyImg={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
