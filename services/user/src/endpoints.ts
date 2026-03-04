import { API_V1_CONTRACTS, type AuthRequest, type AuthResponse, type BookingHistoryResponse, type BookingRecord, type UserProfileResponse } from "../../../packages/types/src/v1";

const users = [
  { id: "u1", email: "demo@movie.local", password: "password123", displayName: "Demo User", loyaltyTier: "silver" as const }
];

const bookingHistoryByUser = new Map<string, BookingRecord[]>([
  [
    "u1",
    [
      {
        bookingId: "bk_seed_1",
        userId: "u1",
        showtimeId: "s1",
        seatIds: ["A1", "A2"],
        status: "confirmed",
        paymentIntentId: "pi_seed_1",
        confirmedAt: new Date(Date.now() - 86_400_000).toISOString()
      }
    ]
  ]
]);

export const userEndpoints = {
  auth: {
    method: "POST",
    path: API_V1_CONTRACTS.user.auth,
    handler: (request: AuthRequest): AuthResponse => {
      const user = users.find((candidate) => candidate.email === request.email && candidate.password === request.password);
      if (!user) {
        throw new Error("Invalid credentials");
      }
      return {
        version: "v1",
        accessToken: `token_${user.id}_${Math.random().toString(36).slice(2, 8)}`,
        expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          loyaltyTier: user.loyaltyTier
        }
      };
    }
  },
  profile: {
    method: "GET",
    path: API_V1_CONTRACTS.user.profile,
    handler: (userId: string): UserProfileResponse => {
      const user = users.find((candidate) => candidate.id === userId);
      if (!user) {
        throw new Error("User not found");
      }
      return {
        version: "v1",
        profile: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          loyaltyTier: user.loyaltyTier
        }
      };
    }
  },
  bookingHistory: {
    method: "GET",
    path: API_V1_CONTRACTS.user.bookingHistory,
    handler: (userId: string): BookingHistoryResponse => ({
      version: "v1",
      userId,
      bookings: bookingHistoryByUser.get(userId) ?? []
    })
  }
} as const;
