/**
 * Versioned contract definitions for User service.
 */

const UserContractsV1 = {
  version: "v1",
  authProfileRequest: {
    type: "object",
    required: ["accessToken"],
    properties: { accessToken: { type: "string" } }
  },
  profileResponse: {
    type: "object",
    required: ["id", "email", "name"],
    properties: {
      id: { type: "string" },
      email: { type: "string" },
      name: { type: "string" }
    }
  },
  bookingHistoryResponse: {
    type: "object",
    required: ["userId", "items"],
    properties: {
      userId: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          required: ["bookingId", "showtimeId", "seatIds", "status", "createdAt"],
          properties: {
            bookingId: { type: "string" },
            showtimeId: { type: "string" },
            seatIds: { type: "array", items: { type: "string" } },
            status: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          }
        }
      }
    }
  }
};

module.exports = { UserContractsV1 };
