import React from 'react';
import AuthModal from '@/components/common/modal/auth/AuthModal';

interface ProfileModifyModalProps {
  message: string;
  onCancel: () => void;
}

export default function ProfileModifyModal({
  message,
  onCancel,
}: ProfileModifyModalProps) {
  return <AuthModal message={message} handleCancelClick={onCancel} />;
}
