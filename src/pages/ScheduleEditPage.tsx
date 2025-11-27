import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTripDays } from "@/shared/utils/dateUtils";
import { MOCK_TRIPS } from "@/features/trip/mock/trips.mock";
import { MOCK_MEMBERS } from "@/features/member/mock/members.mock";
import TripHeader from "@/features/trip/components/TripHeader";
import ScheduleHeader from "@/features/schedule/components/ScheduleHeader";
import ScheduleSection from "@/features/schedule/components/ScheduleSection";
import BottomNav from "@/features/schedule/components/BottomNav";
import { useScheduleWithPlaces } from "@/features/place/hooks/useScheduleWithPlaces";
export default function ScheduleEditPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const trip = MOCK_TRIPS.find((t) => t.id === Number(tripId))!;
  const [selectedDay, setSelectedDay] = useState(1);
  const { grouped,setSchedules, setPlaces, schedules, places, loading, error } = useScheduleWithPlaces(Number(tripId));
  const days = getTripDays(trip.startDate, trip.endDate);

  const handleSave = () => {
    alert("✅ 여행 일정이 저장되었습니다!");
    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="relative min-h-screen bg-white pb-28">
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
        setSchedules={setSchedules}
        loading={loading}
        error={error}
        places={places}
        isEditMode
      />
      <BottomNav activeTab="plan" onChange={() => {}} />
    </div>
  );
}
