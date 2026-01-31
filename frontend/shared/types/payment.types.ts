export interface PaymentRequest {
  bookingId: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvv: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  paymentId?: string;
  pnr?: string;
}