import { useState } from 'react';
import AuthModal from './AuthModal';
import OverlayContainer from '../overlay-container/OverlayContainer';

function TestAuthModal() {
  const [Modal, setModal] = useState(false);
  const onClick = () => {
    setModal(true);
  };

  const handleCancelClick = () => {
    setModal(false);
  };

  return (
    <>
      <button onClick={onClick}>
        가입완료 + 비밀번호 불일치(로그인, 마이페이지) + 중복 이메일 모달
      </button>
      {Modal && (
        <OverlayContainer>
          <AuthModal
            message={'비밀번호가 일치하지 않습니다.'}
            handleCancelClick={handleCancelClick}
          />
        </OverlayContainer>
      )}
    </>
  );
}

export default TestAuthModal;
