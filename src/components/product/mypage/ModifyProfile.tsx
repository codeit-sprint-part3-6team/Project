import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/settingSlice';
import { AppDispatch, RootState } from '@/redux/store';
import uploadImage from '@/lib/mypage/uploadImage';
import modifyProfile from '@/lib/mypage/modifyProfile';
import CDSButton from '@/components/common/button/CDSButton';
import ProfileImageInput from './ProfileImageInput';
import ProfileInfoForm from './ProfileInfoForm';
import ProfileModifyModal from './ProfileModifyModal';
import styles from './ModifyProfile.module.css';
import { toast } from 'react-toastify';

interface ModifyValue {
  nickname: string;
  profileImageUrl: string;
}

export default function ModifyProfile() {
  const user = useSelector((state: RootState) => state.userInfo.user);
  const [values, setValues] = useState<ModifyValue>({
    nickname: user?.nickname || '',
    profileImageUrl: user?.profileImageUrl || '',
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  // user 변경 시 values 상태 동기화
  useEffect(() => {
    if (user) {
      setValues({
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl,
      });
      setPreview(user.profileImageUrl || null);
    }
  }, [user]);

  const handleImageDelete = () => {
    setPreview(null);
  };

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

  // 프로필 변경 클릭시 함수
  const handleSubmit = async () => {
    try {
      let imageUrl = values.profileImageUrl;
      if (image) {
        imageUrl = await uploadImage(image);
      } else if (!preview) {
        imageUrl = null;
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
      // 리덕스 상태 업데이트
      dispatch(
        setUserInfo({
          user: {
            ...user,
            nickname: newProfile.nickname,
            profileImageUrl: newProfile.profileImageUrl,
          },
        }),
      );
      setModal(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = ['png', 'gif', 'jpg', 'jpeg'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        toast.warning(
          '허용되지 않는 파일 형식입니다 (png, gif, jpg만 등록 가능)',
        );

        return;
      }

      setImage(file);
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <section className={styles[`modify-profile`]}>
      <p className={styles.title}>프로필</p>
      <div className={styles[`profile-box`]}>
        <ProfileImageInput
          preview={preview}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
        <div>
          <ProfileInfoForm
            email={user?.email || ''}
            nickname={values.nickname}
            onNicknameChange={handleValueChange}
          />
          <div className={styles[`save-button`]}>
            <CDSButton btnType="profile_save" onClick={handleSubmit}>
              저장
            </CDSButton>
          </div>
        </div>
      </div>
      {modal && (
        <ProfileModifyModal
          message="프로필 수정이 완료되었습니다."
          onCancel={handleCancelClick}
        />
      )}
    </section>
  );
}
