import { Flight } from "./flight.types";

export interface Passenger {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
}

export interface BookingUser {
  _id: string;
  username: string;
}

export interface Booking {
  _id: string;
  user: BookingUser | null;
  flight: Flight | null;
  passengers: Passenger[];
  cabinClass: "economy" | "business";
  pricePerPassenger: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  payment?: string;
  pnr: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  flightId: string;
  cabinClass: "economy" | "business";
  passengers: Passenger[];
}

export interface BookingResponse {
  success: boolean;
  booking?: Booking;
  bookings?: Booking[];
  message?: string;
}
