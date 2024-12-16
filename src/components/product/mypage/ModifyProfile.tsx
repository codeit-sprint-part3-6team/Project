import { useState } from 'react';
import Plus from 'public/ic/ic_imgplus.svg';
import CDSButton from '@/components/common/button/CDSButton';
import uploadImage from '@/lib/mypage/uploadImage';
import Image from 'next/image';
import clsx from 'clsx';
import modifyProfile from '@/lib/mypage/modifyProfile';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import AuthModal from '@/components/common/modal/auth/AuthModal';
import styles from './ModifyProfile.module.css';

interface ModifyValue {
  nickname: string;
  profileImageUrl: string;
}

const INITIAL_VALUES: ModifyValue = {
  nickname: '',
  profileImageUrl: '',
};

interface ModifyProfileProps {
  initialValue?: ModifyValue;
}

export default function ModifyProfile({
  initialValue = INITIAL_VALUES,
}: ModifyProfileProps) {
  const [values, setValues] = useState<ModifyValue>(initialValue);
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const handleCancelClick = () => {
    setModal(false);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }
      const putData = {
        nickname: values.nickname,
        profileImageUrl: imageUrl,
      };
      const newProfile = await modifyProfile(putData);
      setValues({
        nickname: newProfile.nickname,
        profileImageUrl: newProfile.profileImageUrl,
      });
      setModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    }
  };

  return (
    <section className={styles[`modify-profile`]}>
      <p className={styles.title}>프로필</p>
      <div className={styles[`profile-box`]}>
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
            onChange={handleImageChange}
            className={styles[`img-input`]}
          />
        </div>
        <div className={styles[`input-box`]}>
          <div>
            <p className={styles[`sub-title`]}>이메일</p>
            <input
              className={clsx(styles.input, styles[`email-input`])}
              readOnly
            />
          </div>
          <div>
            <p className={styles[`sub-title`]}>닉네임</p>
            <input
              name="nickname"
              value={values.nickname}
              onChange={handleValueChange}
              className={styles.input}
            />
          </div>
          <div className={styles[`save-button`]}>
            <CDSButton btnType="profile_save" onClick={handleSubmit}>
              저장
            </CDSButton>
          </div>
        </div>
      </div>
      {modal && (
        <OverlayContainer>
          <AuthModal
            message={'프로필 수정이 완료되었습니다.'}
            handleCancelClick={handleCancelClick}
          />
        </OverlayContainer>
      )}
    </section>
  );
}
