import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import SigninForm from '@/components/product/auth/SigninForm';
import Logo from 'public/images/img_signinlogo.svg';

function SignIn() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      router.push('/mydashboard');
    }
  }, []);

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
