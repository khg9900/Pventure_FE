import type { ScheduleItem } from "../types/schedule";
import { sampleSchedules } from "../mock/schedule.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function fetchAllSchedules(tripId: number): Promise<ScheduleItem[]> {
  console.log(`📦 [${USE_MOCK ? "Mock" : "API"}] fetchAllSchedules(${tripId}) 호출됨`);
  await new Promise((r) => setTimeout(r, 300));

  if (USE_MOCK) {
    // 목 데이터 필터링
    return sampleSchedules.filter((s) => s.day >= 1);
  }

  // 실제 API 호출 예시 (나중에 연결 예정)
  // const { data } = await axios.get(`/api/trips/${tripId}/schedules`);
  // return data;

  return []; // 기본값 (실제 연결 전)
}

export async function fetchSchedulesByDay(tripId: number, day: number): Promise<ScheduleItem[]> {
  console.log(`📅 [${USE_MOCK ? "Mock" : "API"}] fetchSchedulesByDay(${tripId}, ${day}) 호출됨`);
  await new Promise((r) => setTimeout(r, 300));

  if (USE_MOCK) {
    return sampleSchedules.filter((s) => s.day === day);
  }

  // const { data } = await axios.get(`/api/trips/${tripId}/schedules/${day}`);
  // return data;

  return [];
}
