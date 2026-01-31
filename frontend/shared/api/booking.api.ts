import { apiClient } from "./client";
import {
  BookingResponse,
  CreateBookingRequest,
} from "../types/booking.types";

export const bookingApi = {
  createBooking: (data: CreateBookingRequest) =>
    apiClient.post<BookingResponse>("/bookings", data),

  getMyBookings: () =>
    apiClient.get<BookingResponse>("/bookings/me"),

  getBookingById: (id: string) =>
    apiClient.get<BookingResponse>(`/bookings/${id}`),

  cancelBooking: (id: string) =>
    apiClient.patch<BookingResponse>(`/bookings/${id}/cancel`),
};