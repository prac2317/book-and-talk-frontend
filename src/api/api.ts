import ky from 'ky';

const token = localStorage.getItem('access_token');
const API = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default API;
