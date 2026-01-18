// features/trip/types/trip.dto.ts
import type { TripStatus } from "./trip.type";

export interface TripResponseDto {
  id: number;
  title: string;
  region: string;
  status?: TripStatus;
  startDate?: string | null;
  endDate?: string | null;
  days?: number;
  thumbnail?: string | null;
  destinations?: string[];
  participants?: number;
  folderId?: number | null;
  createdAt?: string;
  updatedAt?: string;
}
