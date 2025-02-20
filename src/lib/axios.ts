import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL;
// const BASE_URL = "http://localhost:3001";


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});