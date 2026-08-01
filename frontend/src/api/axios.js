import axios from 'axios';

const API = axios.create({
  baseURL: 'https://foundation-backend-u8s2.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default API;