import Link from 'next/link';
import styles from '../signin/index.module.css';
import SignupForm from '@/components/product/auth/SignupForm';
import Logo from 'public/images/img_signinlogo.svg';

function SignUp() {
  return (
    <>
      <div className={styles['signin-container']}>
        <Link href={'/'}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>
        <p className={styles.text}>첫 방문을 환영합니다!</p>

        <SignupForm />

        <p className={styles['link-text']}>
          이미 회원이신가요? <Link href={'/signin'}>로그인하기</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
