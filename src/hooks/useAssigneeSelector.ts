import { useState } from 'react';

export default function useAssigneeSelector(initialAssignee) {
  const [selectedMemberNickname, setSelectedMemberNickname] = useState<string>(
    initialAssignee.nickname,
  );
  const [selectedMemberProfileImage, setSelectedMemberProfileImage] =
    useState<string>(initialAssignee.profileImageUrl);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleToggle = () => setIsDropdownOpen((prev) => !prev);

  const handleOptionClick = (nickname: string, profileImageUrl: string) => {
    setSelectedMemberNickname(nickname);
    setSelectedMemberProfileImage(profileImageUrl);
    setIsDropdownOpen(false);
  };

  return {
    selectedMemberNickname,
    selectedMemberProfileImage,
    isDropdownOpen,
    handleToggle,
    handleOptionClick,
  };
}
