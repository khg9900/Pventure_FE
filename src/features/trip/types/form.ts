import type { TripStatus } from "./../types/trip.type";

export interface TripFormData {
  title: string;
  region: string;
  folder: string;
  startDate: Date | null;
  endDate: Date | null;
  coverImage?: File | null;
  days?: number;
}

export interface TripCreatePayload {
  title: string;
  region: string;
  folderId: number | null; 
  startDate: string | null; 
  endDate: string | null;
  days: number;
  coverImage?: File | null;
  status?: TripStatus;
  destinations?: string[];
  participants?: number;
}
