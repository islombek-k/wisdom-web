export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status_code: number;
}

export interface ApiError {
  message: string;
  status_code: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}