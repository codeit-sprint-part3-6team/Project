import { useState } from 'react';
import clsx from 'clsx';
import changePassword from '@/lib/mypage/changePassword';
import CDSButton from '@/components/common/button/CDSButton';
import AuthModal from '@/components/common/modal/auth/AuthModal';
import Visibility from 'public/ic/ic_visibility.svg';
import InVisibility from 'public/ic/ic_invisibility.svg';
import styles from './ChangePassword.module.css';

interface CheangePasswordValue {
  password: string;
  newPassword: string;
  confirmPassword: string;
  error: string;
}

const INITIAL_VALUES: CheangePasswordValue = {
  password: '',
  newPassword: '',
  confirmPassword: '',
  error: null,
};

interface CheangePasswordProps {
  initialValue?: CheangePasswordValue;
}

export default function ChangePassword({
  initialValue = INITIAL_VALUES,
}: CheangePasswordProps) {
  const [values, setValues] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (field: 'current' | 'new' | 'confirm') => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const handleCancelClick = () => {
    setModal(false);
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const { password, newPassword } = values;
      const putData = { password, newPassword };
      await changePassword(putData);

      setValues(initialValue);
      setModal(true);
    } catch (e) {
      setModal(true);
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBlur = () => {
    const { newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      setValues((prevValues) => ({
        ...prevValues,
        error: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        error: null,
      }));
    }
  };

  const isFormValid =
    values.password &&
    values.newPassword &&
    values.confirmPassword &&
    !values.error;

  return (
    <section className={clsx(styles[`modify-profile`], styles[`bottom-box`])}>
      <p className={styles.title}>비밀번호 변경</p>
      <div>
        <p className={styles[`sub-title`]}>현재 비밀번호</p>
        <div className={styles[`input-wrap`]}>
          <input
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            className={styles.input}
            placeholder="비밀번호 입력"
            type={passwordVisibility.current ? 'text' : 'password'}
          />
          <button
            className={styles[`visible-button`]}
            type="button"
            onClick={() => handleClick('current')}
          >
            {passwordVisibility.current ? <Visibility /> : <InVisibility />}
          </button>
        </div>
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호</p>
        <div className={styles[`input-wrap`]}>
          <input
            value={values.newPassword}
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            className={styles.input}
            placeholder="새 비밀번호 입력"
            onBlur={handleBlur}
            type={passwordVisibility.new ? 'text' : 'password'}
          />
          <button
            className={styles[`visible-button`]}
            type="button"
            onClick={() => handleClick('new')}
          >
            {passwordVisibility.new ? <Visibility /> : <InVisibility />}
          </button>
        </div>
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호 확인</p>
        <div
          className={values.error ? styles[`error-wrap`] : styles[`input-wrap`]}
        >
          <input
            value={values.confirmPassword}
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            className={clsx(
              styles.input,
              values.error ? styles['error-input'] : styles[`bottom-input`],
            )}
            placeholder="새 비밀번호 입력"
            onBlur={handleBlur}
            type={passwordVisibility.confirm ? 'text' : 'password'}
          />
          <button
            className={styles[`visible-button`]}
            type="button"
            onClick={() => handleClick('confirm')}
          >
            {passwordVisibility.confirm ? <Visibility /> : <InVisibility />}
          </button>
        </div>
        {values.error && (
          <p className={styles['error-message']}>{values.error}</p>
        )}
      </div>
      <div>
        <CDSButton
          onClick={handleChangePassword}
          btnType="profile_save"
          disabled={!isFormValid || isLoading}
        >
          변경
        </CDSButton>
      </div>
      {modal && (
        <AuthModal
          message={
            errorMessage ? errorMessage : '비밀번호 변경이 완료되었습니다.'
          }
          handleCancelClick={handleCancelClick}
        />
      )}
    </section>
  );
}
