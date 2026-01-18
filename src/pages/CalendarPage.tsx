import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarSection from "@/features/trip/components/CalendarSection";
import TripList from "@/features/trip/components/TripList";
import { useTrips } from "@/features/trip/hooks/useTrips";
import type { Trip } from "@/features/trip/types/trip.type";

export default function CalendarPage() {
  const { trips, loading } = useTrips();
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const handleTripSelect = (trip: Trip | null) => {
    if (!trip) return;
    navigate(`/trips/${trip.id}/schedule`);
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filteredTrips = trips.filter((trip) => {
    const start = trip.startDate;
    const end = trip.endDate;
    if (!start || !end) return false;
    return (
      (start.getFullYear() === currentYear &&
        start.getMonth() === currentMonth) ||
      (end.getFullYear() === currentYear && end.getMonth() === currentMonth)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[var(--color-text-sub)]">
        여행 데이터를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-4 transition-colors duration-300">
      <CalendarSection
        currentDate={currentDate}
        onMonthChange={setCurrentDate}
        trips={trips}
        onTripSelect={handleTripSelect}
      />

      <TripList
        title={`${currentMonth + 1}월의 여행`}
        trips={filteredTrips}
        emptyText="이번 달에 예정된 여행이 없습니다"
        onItemClick={handleTripSelect}
        className="mt-6"
      />
    </div>
  );
}
