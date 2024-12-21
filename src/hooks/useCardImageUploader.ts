import { useState } from 'react';

export default function useCardImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = ['png', 'gif', 'jpg', 'jpeg'];

      // 이미지 확장자
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // 확장자 검증
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        alert('허용되지 않는 파일 형식입니다 (png, gif, jpg만 등록 가능)');
        // e.target.value = '';
        return;
      }

      setImage(file);
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    }
  };

  return { image, preview, handleImageChange };
}
