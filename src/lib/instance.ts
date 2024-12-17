import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
