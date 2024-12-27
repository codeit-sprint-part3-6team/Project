import axios from 'axios';
import Router from 'next/router';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const localStorageToken = localStorage.getItem('accessToken');
  const sessionStorageToken = sessionStorage.getItem('accessToken');

  if (localStorageToken) {
    config.headers.Authorization = `Bearer ${localStorageToken}`;
  } else if (sessionStorageToken) {
    config.headers.Authorization = `Bearer ${sessionStorageToken}`;
  }
  return config;
});

let isRedirecting = false; // 리다이렉트 종료 확인을 위한 flag

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    /**
     * response.status가 401(UnAuthorized)이면
     * 스토리지 토큰 삭제 후 로그인(/signin) 페이지로 리다이렉트
     */
    if (error.response?.status === 401) {
      if (!isRedirecting) {
        isRedirecting = true;

        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');

        alert('로그인이 필요한 서비스 입니다.\n로그인 페이지로 이동합니다.');
        await Router.push('/signin');

        isRedirecting = false;
      }

      return new Promise(() => {}); // API 요청 실패 에러 처리 방지
    }

    return Promise.reject(error);
  },
);

export default instance;
