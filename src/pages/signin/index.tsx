import AuthInput from '@/components/common/input/AuthInput';
import styles from './index.module.css';
import Logo from 'public/images/img_signinlogo.svg';
import { ChangeEvent, useState } from 'react';
import CDSButton from '@/components/common/button/CDSButton';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

function SignIn() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleClick = () => {
    console.log('로그인');
  };

  return (
    <>
      <div className={styles.signin_container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <p className={styles.text}>오늘도 만나서 반가워요!</p>

        <form>
          <AuthInput
            name="email"
            htmlFor="email"
            title="이메일"
            id="email"
            type="text"
            placeholder="이메일을 입력해 주세요"
            value={values.email}
            onChange={handleChange}
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
          />

          <div className={styles.login_button}>
            <CDSButton btnType="auth" onClick={handleClick}>
              로그인
            </CDSButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
