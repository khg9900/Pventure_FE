export type TripStatus = "예정" | "여행중" | "완료";

export interface Trip {
  id: number;
  folderId: number;
  title: string;
  status: TripStatus;
  startDate: Date;
  endDate: Date;
  destinations: string[];
  participants: number;
  thumbnail?: string;
}
