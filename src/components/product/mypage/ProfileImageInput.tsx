import React, { useRef } from 'react';
import Image from 'next/image';
import Plus from 'public/ic/ic_imgplus.svg';
import ImageDelete from 'public/ic/ic_imageDelete.svg';
import styles from './ProfileImageInput.module.css';

interface ProfileImageInputProps {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void;
}

export default function ProfileImageInput({
  preview,
  onImageChange,
  onImageDelete,
}: ProfileImageInputProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onImageDelete();

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  return (
    <div className={styles[`img-input-box`]}>
      <label
        htmlFor="profile-image"
        className={styles[`label-input`]}
        onClick={(e) => {
          if (preview) {
            e.preventDefault();
          }
        }}
      >
        {preview ? (
          <div className={styles[`preview-container`]}>
            <Image
              src={preview}
              alt="프로필 미리보기 이미지"
              fill
              className={styles[`img-preview`]}
            />
            <ImageDelete
              className={styles[`img-delete`]}
              width={18}
              height={18}
              onClick={handleDeleteClick}
            />
          </div>
        ) : (
          <Plus className={styles.plus} width={18} height={18} />
        )}
      </label>
      <input
        type="file"
        id="profile-image"
        onChange={onImageChange}
        className={styles[`img-input`]}
        ref={imageInputRef}
        accept=".gif, .jpg, .png"
      />
    </div>
  );
}
