import React from 'react';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import AuthModal from '@/components/common/modal/auth/AuthModal';

interface ProfileModifyModalProps {
  message: string;
  onCancel: () => void;
}

export default function ProfileModifyModal({
  message,
  onCancel,
}: ProfileModifyModalProps) {
  return (
    <OverlayContainer>
      <AuthModal message={message} handleCancelClick={onCancel} />
    </OverlayContainer>
  );
}
