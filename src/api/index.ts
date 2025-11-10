import axios from 'axios';
import { getToken } from "../lib/auth";

export const API_URL = 'http://10.0.0.7:3000/api';

export const Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})


Api.interceptors.request.use(
    async (config) => {
        const token = await getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);