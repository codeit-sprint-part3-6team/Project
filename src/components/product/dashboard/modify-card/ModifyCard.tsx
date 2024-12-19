function ModifyCard({ closeModal }: { closeModal: () => void }) {
  return (
    <div>
      <button onClick={closeModal}>닫기</button>
      {/* 수정 폼 로직 */}
    </div>
  );
}

export default ModifyCard;
