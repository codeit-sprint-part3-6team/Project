import Link from 'next/link';
import SignupForm from '@/components/product/auth/SignupForm';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import Logo from 'public/images/img_signinlogo.svg';
import styles from '../signin/index.module.css';

function SignUp() {
  const isNotRedirected = useAuthRedirect();

  if (!isNotRedirected) {
    return null; // 인증 확인 중이면 아무것도 렌더링하지 않음
  }

  // 인증되지 않은 사용자만 페이지 렌더링
  return (
    <>
      <div className={styles['signin-container']}>
        <Link href="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>
        <p className={styles.text}>첫 방문을 환영합니다!</p>

        <SignupForm />

        <p className={styles['link-text']}>
          이미 회원이신가요? <Link href="/signin">로그인하기</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
