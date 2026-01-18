export type TimeSlot =
  | "새벽"
  | "아침식사"
  | "오전"
  | "점심식사"
  | "오후"
  | "저녁식사"
  | "밤";

export interface ScheduleBase {
  isCompleted: boolean;
  day: number;
  sequence: number;
  date?: string;
  timeSlot: TimeSlot;
  memo?: string;
}

export interface ScheduleResponseDto extends ScheduleBase {
    id: number;
}

export interface DayInfo {
  day: number;
  date: string;
}
