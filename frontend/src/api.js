import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:8080/auth/',
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);
