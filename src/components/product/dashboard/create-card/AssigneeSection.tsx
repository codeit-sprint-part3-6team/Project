import React from 'react';
import UserProfile from '@/components/common/userprofile/UserProfile';
import ToggleButton from 'public/ic/ic_dropdown.svg';
import styles from './AssigneeSection.module.css';

interface AssigneeSectionProps {
  members: { userId: number; nickname: string; profileImageUrl: string }[];
  selectedMemberNickname: string;
  selectedMemberProfileImage: string;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onSelectMember: (nickname: string, profileImageUrl: string) => void;
}

export default function AssigneeSection({
  members,
  selectedMemberNickname,
  selectedMemberProfileImage,
  isDropdownOpen,
  onToggleDropdown,
  onSelectMember,
}: AssigneeSectionProps) {
  return (
    <section className={styles.section}>
      <p className={styles.topic}>담당자</p>
      <div className={styles[`input-box`]}>
        {selectedMemberNickname ? (
          <div className={styles[`name-select`]}>
            <UserProfile
              type="todo-create"
              nickname={selectedMemberNickname}
              profileImageUrl={selectedMemberProfileImage}
              onlyImg={false}
            />
          </div>
        ) : (
          <input
            type="text"
            value={selectedMemberNickname}
            disabled
            placeholder="이름을 선택해 주세요."
            className={styles[`name-select`]}
          />
        )}
        <ToggleButton
          className={styles[`toggle-button`]}
          width={26}
          height={26}
          onClick={onToggleDropdown}
        />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {members.map((member) => (
            <div
              key={member.userId}
              className={styles.option}
              role="button"
              tabIndex={0}
              onClick={() =>
                onSelectMember(member.nickname, member.profileImageUrl)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectMember(member.nickname, member.profileImageUrl);
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
    </section>
  );
}
