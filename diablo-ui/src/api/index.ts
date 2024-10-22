import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8095/quest',
  timeout: 5000,
});

instance.interceptors.request.use(
  config => {
    // 可以在这里添加 token 或其他认证信息
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default instance;
