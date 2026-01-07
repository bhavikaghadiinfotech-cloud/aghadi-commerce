import axios from "axios";
import { loadFromStorage } from "./storage";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const auth = loadFromStorage("auth", null);
  const expiresAt = auth?.expiresAt;
  const token = auth?.token;
  const expired = expiresAt ? Date.now() > Number(expiresAt) : false;
  if (expired) {
    // prevent sending expired token
    return config;
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
