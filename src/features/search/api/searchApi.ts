import { apiClient } from "@/shared/api/axios";
import { type SearchRequest, type SearchResponse } from "../types";

export const searchApi = {
  search: async (data: SearchRequest): Promise<SearchResponse> => {
    const response = await apiClient.post("/api/search", data);
    return response.data;
  },
};
