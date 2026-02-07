import { Booking } from "../types/booking.types";
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
  fromAirportAbbreviation: string;
  to: string;
  toAirport: string;
  toAirportAbbreviation: string;
  operatedBy: string;
  flightNumber: string;
  airplaneType: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  flightDuration: string;
  numberOfTransfers: string;
  economyPrice: number;
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

  getAllBookings: () =>
    apiClient.get<AdminResponse<Booking[]>>("/admin/bookings/all"),

  addFlight: (data: Omit<Flight, "_id" | "createdAt">) =>
    apiClient.post<AdminResponse<Flight>>("/admin/flight/add", data),

  addFlightsBulk: (
    data: Omit<Flight, "_id" | "createdAt">[], // Fixed: changed parameter type
  ) => apiClient.post<AdminResponse<any>>("/admin/flight/add/bulk", data), // Fixed: sending array directly
};
