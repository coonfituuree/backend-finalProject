export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "user" | "admin";
  isAccountVerified: boolean;
  createdAt: Date;
}

export interface UserResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// Типы для авторизации
export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

// Типы для OTP
export interface VerifyEmailRequest {
  otp: string;
}

export interface SendResetOtpRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}