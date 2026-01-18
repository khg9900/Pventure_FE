import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSchedule } from "@/features/schedule/hooks/useSchedule";
import { getTripDays } from "@/shared/utils/dateUtils";
import { MOCK_TRIPS } from "@/features/trip/mock/trips.mock";
import { MOCK_MEMBERS } from "@/features/member/mock/members.mock";
import TripHeader from "@/features/trip/components/TripHeader";
import ScheduleHeader from "@/features/schedule/components/ScheduleHeader";
import ScheduleSection from "@/features/schedule/components/ScheduleSection";
import BottomNav from "@/features/schedule/components/BottomNav";

export default function SchedulePage() {
  const { tripId } = useParams();
  const trip = MOCK_TRIPS.find((t) => t.id === Number(tripId))!;
  const [selectedDay, setSelectedDay] = useState(1);
  const { grouped, loading, error } = useSchedule(Number(tripId));
  const days = trip.startDate && trip.endDate 
    ? getTripDays(trip.startDate, trip.endDate)
    : [];

  return (
    <div className="relative min-h-screen bg-white pb-28">
      <ScheduleHeader />
      <TripHeader
        title={trip.title}
        period={days.length > 0 
          ? `${days[0].date} ~ ${days[days.length - 1].date}`
          : "날짜 미정"}
        status={trip.status}
        thumbnail={trip.thumbnail}
      />
      <ScheduleSection
        tripMembers={MOCK_MEMBERS}
        days={days}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        grouped={grouped}
        loading={loading}
        error={error}
      />
      <BottomNav activeTab="plan" onChange={() => {}} />
    </div>
  );
}
