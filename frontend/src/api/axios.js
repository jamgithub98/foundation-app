import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5003/api',  // <-- 5003 hona chahiye
});

API.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default API;