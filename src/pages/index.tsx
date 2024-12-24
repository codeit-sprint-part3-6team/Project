import Header from '@/components/product/landing/Header';
import Main from '@/components/product/landing/Main';
import Footer from '@/components/product/landing/Footer';
import useAuthRedirect from '@/hooks/useAuthRedirect';

export default function Home() {
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
        overflowX: 'hidden',
      }}
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
