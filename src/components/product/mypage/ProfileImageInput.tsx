// ProfileImageInput.tsx
import React from 'react';
import Image from 'next/image';
import Plus from 'public/ic/ic_imgplus.svg';
import styles from './ProfileImageInput.module.css';

interface ProfileImageInputProps {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileImageInput({
  preview,
  onImageChange,
}: ProfileImageInputProps) {
  return (
    <div className={styles[`img-input-box`]}>
      <label htmlFor="profile-image" className={styles[`label-input`]}>
        {preview ? (
          <div className={styles[`preview-container`]}>
            <Image
              src={preview}
              alt="프로필 미리보기 이미지"
              fill
              className={styles[`img-preview`]}
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
      />
    </div>
  );
}
