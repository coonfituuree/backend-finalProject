import { apiClient } from "./client";
import { FlightsResponse, FlightSearchRequest } from "../types/flight.types";

export const flightApi = {
  getAllFlights: () =>
    apiClient.post<FlightsResponse>("/flights/getAllRoutes"),

  searchFlights: (data: FlightSearchRequest) =>
    apiClient.post<FlightsResponse>("/flights/getFlightByRoute", data),
};