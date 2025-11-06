export type TimeSlot =
  | "새벽"
  | "아침식사"
  | "오전"
  | "점심식사"
  | "오후"
  | "저녁식사"
  | "밤";

export interface ScheduleItem {
  id: number;
  day: number;
  timeSlot: TimeSlot;
  placeName: string;
  address: string;
  memo?: string;
  hash?: string;
  link?: string;
  links?: string[];
}

export interface DayInfo {
  day: number;
  date: string;
}
