import axios from 'axios';
import type { AxiosInstance } from 'axios'; 

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8095/quest', // 根据实际情况修改
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 可以在这里添加 token 或其他认证信息
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  response => response, // 保持后端返回数据结构
  error => Promise.reject(error)
);

export default instance;
