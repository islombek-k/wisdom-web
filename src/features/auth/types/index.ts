export interface LoginRequest {
  phone: number;
}

export interface LoginResponse {
  message: string;
  phone: number;
  expires_at: string;
}

export interface VerifyRequest {
  phone: number;
  verify_code: string;
  device_id: string;
}

export interface VerifyResponse {
  status: boolean;
  expiry_tariff: number;
  token: string;
}

export interface AuthFormData {
  phone?: string;
  email?: string;
}

export interface OtpFormData {
  otp: string;
}
