import styles from './SigninForm.module.css';
import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/settingSlice';
import { AppDispatch } from '@/redux/store';
import AuthInput from '@/components/common/input/auth-input/AuthInput';
import CheckBox from '@/components/common/checkbox/CheckBox';
import CDSButton from '@/components/common/button/CDSButton';
import AuthModal from '@/components/common/modal/auth/AuthModal';
import { postSignup } from '@/lib/signup/postSignup';
import { postSignin } from '@/lib/signin/postSignin';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/messages';
import {
  emailValidation,
  passwordValidation,
  nicknameValidation,
  passwordCheckValidation,
} from '@/utils/authValidation';

const INITIAL_VALUES = {
  email: '',
  nickname: '',
  password: '',
  passwordCheck: '',
  checkbox: false,
};

function SignupForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [passwordCheckValid, setPasswordCheckValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const isEmailValid = emailValidation(values.email);
  const isPasswordValid = passwordValidation(values.password);
  const isNicknameValid = nicknameValidation(values.nickname);
  const isPasswordCheckValid = passwordCheckValidation(
    values.password,
    values.passwordCheck,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value.replace(/\s/g, ''),
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailValid(!emailValidation(value));
    } else if (name === 'password') {
      setPasswordValid(!passwordValidation(value));
    } else if (name === 'nickname') {
      setNicknameValid(nicknameValidation(value));
    } else if (name === 'passwordCheck') {
      setPasswordCheckValid(passwordCheckValidation(values.password, value));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postSignup(values);

      const { email, password } = values;
      const response = await postSignin({ email, password });
      sessionStorage.setItem('accessToken', response.accessToken);

      // 리덕스 액션 호출
      dispatch(
        setUserInfo({
          user: response.user,
        }),
      );
      alert(`${values.nickname}님 가입이 완료되었습니다.`);
      router.push('/mydashboard');
    } catch (error) {
      setResponseMessage(error.message);
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <AuthInput
          name="email"
          htmlFor="email"
          title="이메일"
          id="email"
          type="text"
          placeholder={PLACEHOLDER.EMAIL_PLACEHOLDER}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={emailValid}
          errorMessage={ERROR_MESSAGE.EMAIL_INVALID_FORMAT}
          autoComplete="email"
        />

        <AuthInput
          name="nickname"
          htmlFor="nickname"
          title="닉네임"
          id="nickname"
          type="text"
          placeholder={PLACEHOLDER.NICKNAME_PLACEHOLDER}
          value={values.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={nicknameValid}
          errorMessage={ERROR_MESSAGE.NICKNAME_MIN_LENGTH}
          autoComplete="nickname"
        />

        <AuthInput
          name="password"
          htmlFor="password"
          title="비밀번호"
          id="password"
          type="password"
          placeholder={PLACEHOLDER.PASSWORD_LENGTH_PLACEHOLDER}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={passwordValid}
          errorMessage={ERROR_MESSAGE.PASSWORD_MIN_LENGTH}
          autoComplete="password"
        />

        <AuthInput
          name="passwordCheck"
          htmlFor="password-check"
          title="비밀번호 확인"
          id="password-check"
          type="password"
          placeholder={PLACEHOLDER.PASSWORD_CONFIRM_PLACEHOLDER}
          value={values.passwordCheck}
          onChange={handleChange}
          onBlur={handleBlur}
          error={passwordCheckValid}
          errorMessage={ERROR_MESSAGE.PASSWORD_MISMATCH}
          autoComplete="password-check"
        />

        <CheckBox
          name="checkbox"
          id="checkbox"
          htmlFor="checkbox"
          text={PLACEHOLDER.TERMS_PLACEHOLDER}
          onChange={handleChange}
        />

        <div className={styles['login-button']}>
          <CDSButton
            btnType="auth"
            type="submit"
            disabled={
              !(
                isEmailValid &&
                isPasswordValid &&
                !isNicknameValid &&
                !isPasswordCheckValid &&
                values.checkbox
              )
            }
          >
            가입하기
          </CDSButton>
        </div>
      </form>

      {isModalVisible && (
        <AuthModal
          message={responseMessage}
          handleCancelClick={() => {
            setIsModalVisible(false);
            setResponseMessage(null);
          }}
        />
      )}
    </>
  );
}

export default SignupForm;
