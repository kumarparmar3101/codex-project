export const API_V1_CONTRACTS = {
  catalog: {
    movies: "/api/v1/catalog/movies",
    events: "/api/v1/catalog/events",
    venues: "/api/v1/catalog/venues",
    theaters: "/api/v1/catalog/theaters",
    showtimes: "/api/v1/catalog/showtimes"
  },
  booking: {
    seatAvailability: "/api/v1/booking/seat-availability/:showtimeId",
    lockSeats: "/api/v1/booking/seat-locks",
    confirmBooking: "/api/v1/booking/confirm"
  },
  user: {
    auth: "/api/v1/user/auth",
    profile: "/api/v1/user/profile/:userId",
    bookingHistory: "/api/v1/user/booking-history/:userId"
  },
  payment: {
    createIntent: "/api/v1/payment/intents",
    webhookConfirm: "/api/v1/payment/webhook/confirm"
  }
} as const;
