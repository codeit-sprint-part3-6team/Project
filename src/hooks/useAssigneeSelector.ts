import { useState } from 'react';

export default function useAssigneeSelector() {
  const [selectedMemberNickname, setSelectedMemberNickname] =
    useState<string>('');
  const [selectedMemberProfileImage, setSelectedMemberProfileImage] =
    useState<string>('');
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
