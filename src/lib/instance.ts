import axios from 'axios';

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

export default instance;
