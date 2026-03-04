export type SeatStatus = "available" | "locked" | "booked";

export interface SeatAvailability {
  showtimeId: string;
  seatId: string;
  status: SeatStatus;
  lockExpiresAt?: string;
}

export interface SeatAvailabilityResponse {
  version: "v1";
  showtimeId: string;
  seats: SeatAvailability[];
}

export interface SeatLockRequest {
  showtimeId: string;
  userId: string;
  seatIds: string[];
  lockDurationSeconds: number;
}

export interface SeatLockResponse {
  version: "v1";
  lockId: string;
  showtimeId: string;
  seatIds: string[];
  expiresAt: string;
  status: "active" | "expired";
}

export interface BookingConfirmRequest {
  lockId: string;
  paymentIntentId: string;
}

export interface BookingRecord {
  bookingId: string;
  userId: string;
  showtimeId: string;
  seatIds: string[];
  status: "confirmed" | "cancelled";
  paymentIntentId: string;
  confirmedAt: string;
}

export interface BookingConfirmResponse {
  version: "v1";
  booking: BookingRecord;
}
