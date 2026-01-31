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
  arrivalTime: string;
  flightDuration: string;
  numberOfTransfers: string;
  EconomPrice: number;
  businessPrice: number;
  createdAt?: Date;
}

export interface FlightSearchRequest {
  from: string;
  to: string;
}

export interface FlightsResponse {
  success: boolean;
  data?: Flight[];
  message?: string;
}