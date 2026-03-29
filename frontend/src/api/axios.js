import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // Don't attach auth token to password reset requests
  const isPublicRoute = ['/auth/forgot-password', '/auth/reset-password'].some(r => config.url.includes(r));
  if (token && !isPublicRoute) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
