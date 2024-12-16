import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './index.module.css';
import Logo from 'public/images/img_signinlogo.svg';
import AuthInput from '@/components/common/input/AuthInput';
import CDSButton from '@/components/common/button/CDSButton';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/messages';
import { emailValidation, passwordValidation } from '@/utils/authValidation';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import AuthModal from '@/components/common/modal/auth/AuthModal';
import { postSignin } from '@/lib/signin/postSignin';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/settingSlice';
import { AppDispatch } from '@/redux/store';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

function SignIn() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const isEmailValid = emailValidation(values.email);
    const isPasswordValid = passwordValidation(values.password);
    setDisabled(!(isEmailValid && isPasswordValid));
  }, [values]);

  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      router.push('/mydashboard');
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailValid(!emailValidation(value));
    } else if (name === 'password') {
      setPasswordValid(!passwordValidation(value));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await postSignin(values);
      console.log(response.accessToken);
      sessionStorage.setItem('accessToken', response.accessToken);
      // 리덕스 액션 호출
      dispatch(
        setUserInfo({
          user: response.user,
        }),
      );
      router.push('/mydashboard');
    } catch (error: any) {
      if (error?.message) {
        setResponseMessage(error.message);
      }
      setIsModalVisible(true);
    }
  };

  const handleCancelClick = () => {
    setIsModalVisible(false);
    setResponseMessage(null);
  };

  return (
    <>
      <div className={styles.signin_container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <p className={styles.text}>오늘도 만나서 반가워요!</p>

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
            name="password"
            htmlFor="password"
            title="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={passwordValid}
            errorMessage={ERROR_MESSAGE.PASSWORD_MIN_LENGTH}
            autoComplete="password"
          />

          <div className={styles.login_button}>
            <CDSButton btnType="auth" type="submit" disabled={disabled}>
              로그인
            </CDSButton>
          </div>
        </form>

        <p className={styles.signupText}>
          회원이 아니신가요? <Link href={'/signup'}>회원가입하기</Link>
        </p>
      </div>

      {isModalVisible && (
        <OverlayContainer>
          <AuthModal
            message={responseMessage}
            handleCancelClick={handleCancelClick}
          />
        </OverlayContainer>
      )}
    </>
  );
}

export default SignIn;
