import { useEffect, useState } from "react";
import { fetchAllPlaces } from "@/features/place/api/place.api";
import type { PlaceResponseDto } from "@/features/place/types/place";

export function usePlace(scheduleId: number) {
  const [places, setPlaces] = useState<PlaceResponseDto[] | null>(null);
  const [placeLoading, setLoading] = useState(true);
  const [placeError, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scheduleId) return;

    setLoading(true);
    (async () => {
      try {
        const data = await fetchAllPlaces(scheduleId);  // scheduleId에 맞는 장소 정보를 가져옵니다.
        setPlaces(data || null);
      } catch (err) {
        setError("장소 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [scheduleId]); // scheduleId가 변경될 때마다 다시 fetch

  return { places, setPlaces, placeLoading, placeError};  // 반환값으로 places, placeLoading, placeError 제공
}
