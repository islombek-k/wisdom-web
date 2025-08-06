import { apiClient } from "@/shared/api/axios";
import { type ApiResponse } from "@/shared/api/types";
import {
  type LoginRequest,
  type LoginResponse,
  type VerifyRequest,
  type VerifyResponse,
} from "../types";

export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post("/api/auth/login", data);
    return response.data;
  },

  verify: async (data: VerifyRequest): Promise<VerifyResponse> => {
    const response = await apiClient.post("/api/auth/verify", data);
    return response.data;
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await apiClient.post("/api/auth/logout");
    return response.data;
  },
};
