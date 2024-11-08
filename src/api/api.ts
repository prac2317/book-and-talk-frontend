import ky from 'ky';

const API = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
