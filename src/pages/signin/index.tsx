import Link from 'next/link';
import styles from './index.module.css';
import SigninForm from '@/components/product/auth/SigninForm';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import Logo from 'public/images/img_signinlogo.svg';

function SignIn() {
  const isNotRedirected = useAuthRedirect();

  if (!isNotRedirected) {
    return null; // 인증 확인 중이면 아무것도 렌더링하지 않음
  }

  // 인증되지 않은 사용자만 페이지 렌더링
  return (
    <>
      <div className={styles['signin-container']}>
        <Link href={'/'}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>
        <p className={styles.text}>오늘도 만나서 반가워요!</p>

        <SigninForm />

        <p className={styles['link-text']}>
          회원이 아니신가요? <Link href={'/signup'}>회원가입하기</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
