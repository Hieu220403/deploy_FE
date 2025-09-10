/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from "axios";
import { refreshToken } from "~/redux/features/auth/actions";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://deploy-be-a9cd.onrender.com/";
const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let queue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

httpRequest.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const original = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (error?.response?.status === 401 && original && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((newAccessToken) => {
            original.headers = original.headers ?? {};
            (original.headers as any).Authorization =
              `Bearer ${newAccessToken}`;
            original._retry = true;
            return httpRequest(original);
          })
          .catch((err) => Promise.reject(err));
      }

      try {
        isRefreshing = true;

        // luôn lấy refresh token mới nhất
        const refrToken = localStorage.getItem("refreshToken") || "";
        const newAccessToken = await refreshToken(refrToken);

        localStorage.setItem("accessToken", newAccessToken);

        queue.forEach(({ resolve }) => resolve(newAccessToken));
        queue = [];

        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${newAccessToken}`;
        original._retry = true;
        return httpRequest(original);
      } catch (e) {
        queue.forEach(({ reject }) => reject(e));
        queue = [];

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default httpRequest;
