import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTripDays } from "@/shared/utils/dateUtils";
import { MOCK_TRIPS } from "@/features/trip/mock/trips.mock";
import { MOCK_MEMBERS } from "@/features/member/mock/members.mock";
import TripHeader from "@/features/trip/components/TripHeader";
import ScheduleHeader from "@/features/schedule/components/ScheduleHeader";
import ScheduleSection from "@/features/schedule/components/ScheduleSection";
import BottomNav from "@/features/schedule/components/BottomNav";
import { useScheduleWithPlaces } from "@/features/place/hooks/useScheduleWithPlaces";

export default function SchedulePage() {
  const { tripId } = useParams();
  const trip = MOCK_TRIPS.find((t) => t.id === Number(tripId))!;
  const [selectedDay, setSelectedDay] = useState(1);
  const days = getTripDays(trip.startDate, trip.endDate);

  // 커스텀 훅을 사용하여 일정 및 장소 데이터 가져오기
  const { grouped, places, loading, error } = useScheduleWithPlaces(Number(tripId));

  return (
    <div className="relative min-h-screen bg-white pb-10">
      <ScheduleHeader 
        tripId={Number(trip.id)}
      />
      <TripHeader
        title={trip.title}
        period={`${days[0].date} ~ ${days[days.length - 1].date}`}
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
        places={places}
      />
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-full px-6 py-3 bg-white">
        <BottomNav activeTab="plan" onChange={() => {}} />
      </div>
    </div>
  );
}
