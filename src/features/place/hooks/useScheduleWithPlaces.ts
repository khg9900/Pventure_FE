import { useEffect, useState, useMemo } from "react";
import { useSchedule } from "@/features/schedule/hooks/useSchedule";
import { fetchAllPlaces } from "@/features/place/api/place.api";
import type { PlaceResponseDto } from "@/features/place/types/place";
import type { ScheduleResponseDto } from "@/features/schedule/types/schedule";

export function useScheduleWithPlaces(tripId: number) {
  const { grouped, schedules, setSchedules, loading: scheduleLoading, error: scheduleError } = useSchedule(tripId);

  const [places, setPlaces] = useState<Record<number, PlaceResponseDto | null>>({});
  const [placeLoading, setPlaceLoading] = useState(false);
  const [placeError, setPlaceError] = useState<string | null>(null);

  // 수정된 부분: schedules 배열이 변경될 때만 실행
  useEffect(() => {
    if (!schedules || schedules.length === 0) return;

    const fetchPlaces = async () => {
      setPlaceLoading(true);
      try {
        const results: Record<number, PlaceResponseDto | null> = {};

        await Promise.all(
          schedules.map(async (s) => {
            try {
              const data = await fetchAllPlaces(s.id);
              results[s.id] = data.length > 0 ? data[0] : null; // 첫 번째 장소만 저장
            } catch (e) {
              console.error(`❌ 일정 ${s.id}의 장소 로딩 실패`, e);
            }
          })
        );

        setPlaces(results); // 장소 데이터 상태를 업데이트
      } catch (err) {
        setPlaceError("장소 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setPlaceLoading(false);
      }
    };

    fetchPlaces();
  }, [schedules]); // schedules가 변경될 때만 실행

  // grouped를 useMemo로 메모이제이션
  const memoizedGrouped = useMemo(() => {
    const result: Record<number, ScheduleResponseDto[]> = {};
    schedules.forEach((schedule) => {
      if (!result[schedule.day]) result[schedule.day] = [];
      result[schedule.day].push(schedule);
    });
    return result;
  }, [schedules]); // schedules가 변경될 때만 다시 계산

  return {
    grouped: memoizedGrouped,
    setSchedules,
    setPlaces,
    schedules,
    places,
    loading: scheduleLoading || placeLoading,
    error: scheduleError || placeError,
  };
}
