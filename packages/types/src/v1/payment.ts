export type PaymentIntentStatus =
  | "requires_payment_method"
  | "requires_confirmation"
  | "processing"
  | "succeeded"
  | "failed";

export interface PaymentIntentRequest {
  userId: string;
  amountCents: number;
  currency: string;
  bookingContext: {
    showtimeId: string;
    seatIds: string[];
  };
}

export interface PaymentIntent {
  id: string;
  userId: string;
  amountCents: number;
  currency: string;
  status: PaymentIntentStatus;
  clientSecret: string;
}

export interface PaymentIntentResponse {
  version: "v1";
  paymentIntent: PaymentIntent;
}

export interface PaymentWebhookEvent {
  paymentIntentId: string;
  eventType: "payment.processing" | "payment.succeeded" | "payment.failed";
}

export interface PaymentConfirmationResponse {
  version: "v1";
  paymentIntentId: string;
  status: PaymentIntentStatus;
}
