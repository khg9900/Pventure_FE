import type { ScheduleItem } from "../types/schedule";

export const sampleSchedules: ScheduleItem[] = [
  {
    id: 1,
    day: 1,
    timeSlot: "아침식사",
    placeName: "츠키지 시장 스시잔마이",
    address: "도쿄도 츠키지 4-11-9",
    memo: "새벽에 가면 줄이 덜 길다 🍣",
    links: ["https://maps.google.com"],
  },
  {
    id: 2,
    day: 1,
    timeSlot: "오후",
    placeName: "시부야 스크램블 교차로",
    address: "도쿄도 시부야구 우다가와초",
    memo: "쇼핑하기 좋은 스팟 🛍️",
  },
  {
    id: 3,
    day: 1,
    timeSlot: "오후",
    placeName: "도쿄타워",
    address: "미나토구 시바코엔 4-2-8",
    memo: "야경 명소 🌆",
  },
];
