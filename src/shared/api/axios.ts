import axios, { AxiosError, type AxiosResponse } from "axios";
import { env } from "@/shared/config/env";

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.token = `${token}`;
    }

    const deviceId = getOrCreateDeviceId();
    config.headers["X-Device-ID"] = deviceId;

    if (env.IS_DEV) {
      console.log("API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    if (env.IS_DEV) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (env.IS_DEV) {
      console.log("API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error: AxiosError) => {
    if (env.IS_DEV) {
      console.error("Response Error:", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/register";
    }

    return Promise.reject(error);
  }
);

function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem("device_id");

  if (!deviceId) {
    deviceId = `device_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    localStorage.setItem("device_id", deviceId);
  }

  return deviceId;
}

export { getOrCreateDeviceId };
