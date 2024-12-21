import { useState } from 'react';
import DeleteCardsModal from './DeleteCardsModal';

function TestDeleteCardsModal() {
  const [Modal, setModal] = useState(false);
  const onClick = () => {
    setModal(true);
  };

  const handleCancelClick = () => {
    setModal(false);
  };

  const handleDeleteClick = () => {
    console.log('Delete');
  };

  return (
    <>
      <button onClick={onClick}>카드 삭제 모달</button>
      {Modal && (
        <DeleteCardsModal
          message={'컬럼의 모든 카드가 삭제됩니다.'}
          handleCancelClick={handleCancelClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </>
  );
}

export default TestDeleteCardsModal;
