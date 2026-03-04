import { API_V1_CONTRACTS, type BookingConfirmRequest, type BookingConfirmResponse, type BookingRecord, type SeatAvailabilityResponse, type SeatLockRequest, type SeatLockResponse } from "../../../packages/types/src/v1";

const showtimeSeats = new Map<string, Set<string>>();
const activeLocks = new Map<string, SeatLockResponse & { userId: string }>();
const bookings = new Map<string, BookingRecord>();

const ensureShowtime = (showtimeId: string): Set<string> => {
  if (!showtimeSeats.has(showtimeId)) {
    const seeded = new Set(Array.from({ length: 30 }, (_, i) => `A${i + 1}`));
    showtimeSeats.set(showtimeId, seeded);
  }
  return showtimeSeats.get(showtimeId)!;
};

const isLockActive = (lock: SeatLockResponse & { userId: string }): boolean => new Date(lock.expiresAt).getTime() > Date.now();

export const bookingEndpoints = {
  seatAvailability: {
    method: "GET",
    path: API_V1_CONTRACTS.booking.seatAvailability,
    handler: (showtimeId: string): SeatAvailabilityResponse => {
      const seats = Array.from(ensureShowtime(showtimeId));
      return {
        version: "v1",
        showtimeId,
        seats: seats.map((seatId) => {
          const locked = Array.from(activeLocks.values()).find((lock) => lock.showtimeId === showtimeId && lock.seatIds.includes(seatId) && isLockActive(lock));
          const booked = Array.from(bookings.values()).some((booking) => booking.showtimeId === showtimeId && booking.seatIds.includes(seatId));
          if (booked) {
            return { showtimeId, seatId, status: "booked" as const };
          }
          if (locked) {
            return { showtimeId, seatId, status: "locked" as const, lockExpiresAt: locked.expiresAt };
          }
          return { showtimeId, seatId, status: "available" as const };
        })
      };
    }
  },
  lockSeats: {
    method: "POST",
    path: API_V1_CONTRACTS.booking.lockSeats,
    handler: (request: SeatLockRequest): SeatLockResponse => {
      const expiresAt = new Date(Date.now() + request.lockDurationSeconds * 1000).toISOString();
      const lockId = `lock_${Math.random().toString(36).slice(2, 10)}`;
      const lock: SeatLockResponse & { userId: string } = {
        version: "v1",
        lockId,
        showtimeId: request.showtimeId,
        seatIds: request.seatIds,
        expiresAt,
        status: "active",
        userId: request.userId
      };
      activeLocks.set(lockId, lock);
      return lock;
    }
  },
  confirmBooking: {
    method: "POST",
    path: API_V1_CONTRACTS.booking.confirmBooking,
    handler: (request: BookingConfirmRequest): BookingConfirmResponse => {
      const lock = activeLocks.get(request.lockId);
      if (!lock || !isLockActive(lock)) {
        throw new Error("Seat lock is missing or expired");
      }
      if (!request.paymentIntentId.startsWith("pi_")) {
        throw new Error("Payment intent is not in a confirmable state");
      }
      const bookingId = `bk_${Math.random().toString(36).slice(2, 10)}`;
      const booking: BookingRecord = {
        bookingId,
        userId: lock.userId,
        showtimeId: lock.showtimeId,
        seatIds: lock.seatIds,
        status: "confirmed",
        paymentIntentId: request.paymentIntentId,
        confirmedAt: new Date().toISOString()
      };
      bookings.set(bookingId, booking);
      activeLocks.delete(request.lockId);
      return { version: "v1", booking };
    }
  }
} as const;

export const bookingStore = { bookings, activeLocks };
