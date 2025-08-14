import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";
import { type VerifyRequest } from "../types";
import { getOrCreateDeviceId } from "@/shared/api/axios";

export const useLogin = ({ phoneNumber }: { phoneNumber: string }) => {
  const navigate = useNavigate();
  console.log("phoneNumber", phoneNumber);
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      console.log("Login response:", response);
      toast.success(
        response?.message ||
          response?.data?.message ||
          "Code sent successfully!"
      );
      if (phoneNumber) {
        localStorage.setItem("auth_phone", phoneNumber);
      }
      navigate("/otp");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to send code";
      toast.error(message);
    },
  });
};

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<VerifyRequest, "device_id">) =>
      authApi.verify({
        ...data,
        device_id: getOrCreateDeviceId(),
      }),
    onSuccess: (response) => {
      localStorage.setItem("auth_token", response.token);
      sessionStorage.removeItem("auth_phone");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Invalid verification code";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem("auth_token");
      queryClient.clear();
      navigate("/register");
      toast.success("Logged out successfully");
    },
    onError: () => {
      localStorage.removeItem("auth_token");
      queryClient.clear();
      navigate("/register");
    },
  });
};
