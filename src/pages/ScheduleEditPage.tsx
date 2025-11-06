import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSchedule } from "@/features/schedule/hooks/useSchedule";
import { getTripDays } from "@/shared/utils/dateUtils";
import { MOCK_TRIPS } from "@/features/trip/mock/trips.mock";
import { MOCK_MEMBERS } from "@/features/member/mock/members.mock";
import TripHeader from "@/features/trip/components/TripHeader";
import ScheduleHeader from "@/features/schedule/components/ScheduleHeader";
import ScheduleSection from "@/features/schedule/components/ScheduleSection";
import BottomNav from "@/features/schedule/components/BottomNav";

export default function ScheduleEditPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const trip = MOCK_TRIPS.find((t) => t.id === Number(tripId))!;
  const [selectedDay, setSelectedDay] = useState(1);
  const { grouped, setSchedules, loading, error } = useSchedule(Number(tripId));
  const days = getTripDays(trip.startDate, trip.endDate);

  const handleSave = () => {
    alert("✅ 여행 일정이 저장되었습니다!");
    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="relative min-h-screen bg-white pb-28">
      <ScheduleHeader />
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
        isEditMode
      />
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={handleSave}
          className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold shadow-md hover:bg-[var(--color-primary-light)] transition-all"
        >
          저장하기
        </button>
      </div>
      <BottomNav activeTab="plan" onChange={() => {}} />
    </div>
  );
}
