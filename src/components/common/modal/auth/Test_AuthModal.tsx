import { useState } from 'react';
import AuthModal from './AuthModal';
import OverlayContainer from '../overlay-container/OverlayContainer';

function TestAuthModal() {
  const [Modal, setModal] = useState(false);
  const onClick = () => {
    setModal(true);
  };

  const handleClick = () => {
    setModal(false);
  };

  return (
    <>
      <button onClick={onClick}>모달 열기</button>
      {Modal && (
        <OverlayContainer>
          <AuthModal
            message={'비밀번호가 일치하지 않습니다.'}
            handleClick={handleClick}
          />
        </OverlayContainer>
      )}
    </>
  );
}

export default TestAuthModal;
