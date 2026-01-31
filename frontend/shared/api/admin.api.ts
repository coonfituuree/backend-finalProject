import { apiClient } from "./client";

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "user" | "admin";
  isAccountVerified: boolean;
  createdAt: Date;
}

export interface Flight {
  _id: string;
  from: string;
  fromAirport: string;
  to: string;
  toAirport: string;
  operatedBy: string;
  flightNumber: string;
  airplaneType: string;
  departureTime: string;
  arrivalTime: string;
  flightDuration: string;
  numberOfTransfers: string;
  EconomPrice: number;
  businessPrice: number;
  createdAt?: Date;
}

export interface AdminResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const adminApi = {
  getAllUsers: () => apiClient.get<AdminResponse<AdminUser[]>>("/admin/users"),

  addFlight: (data: Omit<Flight, "_id" | "createdAt">) =>
    apiClient.post<AdminResponse<Flight>>("/admin/flight/add", data),

  addFlightsBulk: (data: any[]) =>
    apiClient.post<AdminResponse<Flight[]>>("/admin/flight/add/bulk", {
      flights: data,
    }),
};
