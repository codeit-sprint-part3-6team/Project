import Header from '@/components/product/landing/Header';
import Main from '@/components/product/landing/Main';
import Footer from '@/components/product/landing/Footer';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { useEffect } from 'react';

export default function Home() {
  // 배포 확인 테스트
  useEffect(() => {
    const url = window.location.href;
    if (url === 'https://dev-taskify.vercel.app/') {
      console.log('develop branch');
    } else if (url === 'https://taskify-codeit.vercel.app/') {
      console.log('main branch');
    }
  }, []);

  const isNotRedirected = useAuthRedirect();

  if (!isNotRedirected) {
    return null; // 인증 확인 중이면 아무것도 렌더링하지 않음
  }

  // 인증되지 않은 사용자만 페이지 렌더링
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--black)',
      }}
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
