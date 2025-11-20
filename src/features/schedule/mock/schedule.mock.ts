import type { ScheduleResponseDto } from "../types/schedule";

export const sampleSchedules: ScheduleResponseDto[] = [
  {
    id: 1,
    day: 1,
    sequence: 1,
    timeSlot: "새벽",
    isCompleted: false,
    memo: "새벽에 가면 줄이 덜 길다 🍣",

  },
  {
    id: 2,
    day: 1,
    sequence: 2,
    timeSlot: "오후",
    isCompleted: false,
    memo: "오후에 가면 더 좋다 🍣",
  },
  {
    id: 3,
    day: 1,
    sequence: 3,
    timeSlot: "오후",
    isCompleted: false,
    memo: "오후에 가면 더 좋다 🍣",
  },
    {
    id: 4,
    day: 1,
    sequence: 4,
    timeSlot: "밤",
    isCompleted: false,
  },
];
