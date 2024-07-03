import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axios;
