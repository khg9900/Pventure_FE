// features/trip/types/trip.type.ts

export type TripStatus = "예정" | "여행중" | "완료";

export interface Trip {
  id: number;
  folderId: number;
  title: string;
  status: TripStatus;
  startDate: Date | null;
  endDate: Date | null;
  days: number;
  destinations: string[];
  participants: number;
  thumbnail?: string;
}
