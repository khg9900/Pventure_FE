// features/trip/types/trip.payload.ts
import type { TripStatus } from "./trip.type";

export interface TripCreatePayload {
  title: string;
  region: string;
  folderId?: number | null;
  startDate: string | null;
  endDate: string | null;
  days: number;
  coverImage?: File | null;
  status?: TripStatus;
  destinations?: string[];
  participants?: number;
}

export interface TripUpdatePayload {
  tripId: number;
  title?: string;
  region?: string;
  folderId?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  days?: number;
  coverImage?: File | null;
  status?: TripStatus;
  destinations?: string[];
  participants?: number;
}
