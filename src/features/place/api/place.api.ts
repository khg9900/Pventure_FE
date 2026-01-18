import { mockPlaceData } from "@/features/place/mock/place.mock";
import type { PlaceResponseDto } from "@/features/place/types/place";
import type { PlaceType } from "../constants";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function fetchAllPlaces(scheduleId?: number): Promise<PlaceResponseDto[]> {
  console.log(`📦 [${USE_MOCK ? "Mock" : "API"}] fetchAllPlaces() 호출됨`);
  await new Promise((r) => setTimeout(r, 300));

  if (USE_MOCK) {
    // scheduleId가 있으면 해당하는 Place만 필터링
    if (scheduleId) {
      return mockPlaceData
        .filter((place) => place.id === scheduleId)
        .map((place) => ({ ...place, placeType: place.placeType as PlaceType }));
    }

    // scheduleId가 없으면 모든 Place 반환
    return mockPlaceData.map((place) => ({ ...place, placeType: place.placeType as PlaceType }));
  }

  // 실제 API 호출 예시 (나중에 연결 예정)
  // const { data } = await axios.get(`/api/schedules/${scheduleId}/places`);
  // return data;

  return []; // 기본값 (실제 연결 전)
}