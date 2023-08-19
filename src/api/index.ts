import axios from 'axios';
import qs from 'qs'

// 创建一个 Axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 设置基本URL
  timeout: 5000, // 设置请求超时时间
  method: "POST",
  withCredentials: true
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在请求发送前对请求进行修改
    if (config.method === 'post') {
      if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.data = qs.stringify(config.data)
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 可以在收到响应后对响应进行处理
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
