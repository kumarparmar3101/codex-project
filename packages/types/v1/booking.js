/**
 * Versioned contract definitions for Booking service.
 */

const BookingContractsV1 = {
  version: "v1",
  seatAvailabilityResponse: {
    type: "object",
    required: ["showtimeId", "seats"],
    properties: {
      showtimeId: { type: "string" },
      seats: {
        type: "array",
        items: {
          type: "object",
          required: ["seatId", "status"],
          properties: {
            seatId: { type: "string" },
            status: { enum: ["available", "locked", "booked"] },
            lockExpiresAt: { type: "string", format: "date-time" }
          }
        }
      }
    }
  },
  seatLockRequest: {
    type: "object",
    required: ["showtimeId", "userId", "seatIds", "ttlSeconds"],
    properties: {
      showtimeId: { type: "string" },
      userId: { type: "string" },
      seatIds: { type: "array", items: { type: "string" } },
      ttlSeconds: { type: "number", minimum: 30 }
    }
  },
  seatLockResponse: {
    type: "object",
    required: ["lockId", "showtimeId", "seatIds", "expiresAt"],
    properties: {
      lockId: { type: "string" },
      showtimeId: { type: "string" },
      seatIds: { type: "array", items: { type: "string" } },
      expiresAt: { type: "string", format: "date-time" }
    }
  },
  bookingConfirmRequest: {
    type: "object",
    required: ["lockId", "paymentIntentId"],
    properties: {
      lockId: { type: "string" },
      paymentIntentId: { type: "string" }
    }
  }
};

module.exports = { BookingContractsV1 };
