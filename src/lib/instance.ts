import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export default instance;
