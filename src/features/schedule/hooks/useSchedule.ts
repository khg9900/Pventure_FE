import { useEffect, useState, useMemo } from "react";
import type { ScheduleItem } from "../types/schedule";
import { fetchAllSchedules } from "../api/schedule.api";

export function useSchedule(tripId: number) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchAllSchedules(tripId);
        setSchedules(data);
      } catch (err) {
        setError("일정 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [tripId]);

  const grouped = useMemo(() => {
    return schedules.reduce<Record<number, ScheduleItem[]>>((acc, s) => {
      (acc[s.day] ??= []).push(s);
      return acc;
    }, {});
  }, [schedules]);

  return { schedules, grouped, setSchedules, loading, error };
}
