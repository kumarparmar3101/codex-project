import type { BookingRecord } from "./booking";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  version: "v1";
  accessToken: string;
  expiresAt: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  loyaltyTier: "standard" | "silver" | "gold";
}

export interface UserProfileResponse {
  version: "v1";
  profile: UserProfile;
}

export interface BookingHistoryResponse {
  version: "v1";
  userId: string;
  bookings: BookingRecord[];
}
