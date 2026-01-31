import { apiClient } from "./client";
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  VerifyEmailRequest,
  SendResetOtpRequest,
  ResetPasswordRequest,
} from "../types/auth.types";

export const authApi = {
  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>("/auth/register", data),

  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/auth/login", data),

  logout: () => apiClient.post<AuthResponse>("/auth/logout"),

  sendVerifyOtp: () =>
    apiClient.post<AuthResponse>("/auth/send-verify-otp"),

  verifyEmail: (data: VerifyEmailRequest) =>
    apiClient.post<AuthResponse>("/auth/verify-account", data),

  sendResetOtp: (data: SendResetOtpRequest) =>
    apiClient.post<AuthResponse>("/auth/send-reset-otp", data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post<AuthResponse>("/auth/reset-password", data),

  isAuthenticated: () =>
    apiClient.post<AuthResponse>("/auth/is-auth"),
};