import { apiClient } from "./client";
import { UserResponse, UpdateUserRequest } from "../types/user.types";

export const userApi = {
  getCurrentUser: () => apiClient.get<UserResponse>("/user/profile"),

  updateUser: (data: UpdateUserRequest) =>
    apiClient.put<UserResponse>("/user/update", data),
};