import { apiClient } from "@/shared/api/axios";
import type {
  WordbankListResponse,
  CreateFolderRequest,
  CreateFolderResponse,
  CreateWordbankRequest,
  CreateWordbankResponse,
} from "../types";

export const wordbankApi = {
  getList: async (): Promise<WordbankListResponse> => {
    const response = await apiClient.get("/api/wordbank/list");
    return response.data;
  },

  createFolder: async (
    data: CreateFolderRequest
  ): Promise<CreateFolderResponse> => {
    const response = await apiClient.post("/api/wordbank/folder/create", data);
    return response.data;
  },

  create: async (data: CreateWordbankRequest): Promise<CreateWordbankResponse> => {
    const response = await apiClient.post("/api/wordbank/create", data);
    return response.data;
  },
};
