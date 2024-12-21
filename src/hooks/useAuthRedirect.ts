import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useAuthRedirect() {
  const [isAuthStatus, setIsAuthStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 클라이언트 환경에서만 스토리지 접근
    if (typeof window !== 'undefined') {
      const accessToken =
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken');

      if (accessToken) {
        setIsAuthStatus(true);
        router.push('/mydashboard'); // 인증된 사용자는 대시보드로 리다이렉션
      }
    }
  }, [router]);

  // 인증 상태 확인 중이라면 아무것도 렌더링하지 않음
  if (isAuthStatus) {
    return null;
  }

  return true;
}
