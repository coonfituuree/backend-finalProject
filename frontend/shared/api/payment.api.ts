import { apiClient } from "./client";
import { PaymentRequest, PaymentResponse } from "../types/payment.types";

export const paymentApi = {
  payBooking: (data: PaymentRequest) =>
    apiClient.post<PaymentResponse>("/payments/pay", data),
};