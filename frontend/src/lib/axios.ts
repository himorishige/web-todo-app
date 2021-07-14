import axios from 'axios';
import { API_KEY, API_URL } from 'src/constants';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: { 'x-api-key': API_KEY },
});
