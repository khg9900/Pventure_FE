import { useState } from "react";
import ScheduleDayTabs from "./ScheduleDayTabs";
import ScheduleListSection from "./ScheduleListSection";
import MemberListSection from "@/features/member/components/MemberListSection";
import { Pin } from "lucide-react";
import ScheduleItemModal from "./ScheduleItemModal";
import type { ScheduleItem } from "../types/schedule";
import type { Member } from "@/features/member/types/member.type";

interface Props {
  tripMembers: Member[];
  days: { day: number; date: string }[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  grouped: Record<number, ScheduleItem[]>;
  loading?: boolean;
  error?: string | null;
  setSchedules?: (schedules: ScheduleItem[]) => void;
  isEditMode?: boolean;
}

export default function ScheduleSection({
  tripMembers,
  days,
  selectedDay,
  onSelectDay,
  grouped,
  loading,
  error,
  setSchedules,
  isEditMode = false,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleItem["timeSlot"] | null>(null);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  if (loading)
    return <div className="text-center py-20 text-gray-400 text-sm">일정 데이터를 불러오는 중입니다...</div>;

  if (error)
    return <div className="text-center py-20 text-red-400 text-sm">❌ {error}</div>;

  const currentSchedules = grouped[selectedDay] || [];

  const mergeWithAllDays = (updatedForSelectedDay: ScheduleItem[]) => {
    const merged: ScheduleItem[] = Object.entries(grouped).flatMap(([day, arr]) =>
      Number(day) === selectedDay ? updatedForSelectedDay : arr
    );
    setSchedules?.(merged);
  };

  const handleReorder = (updated: ScheduleItem[]) => {
    mergeWithAllDays(updated);
  };

  const handleAdd = (slot: string) => {
    setSelectedSlot(slot as ScheduleItem["timeSlot"]);
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: ScheduleItem) => {
    if (!isEditMode) return;
    setSelectedSlot(item.timeSlot);
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSave = (item: ScheduleItem) => {
    const exists = currentSchedules.some((s) => s.id === item.id);
    const updated = exists
      ? currentSchedules.map((s) => (s.id === item.id ? item : s))
      : [...currentSchedules, item];
    mergeWithAllDays(updated);
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    const updated = currentSchedules.filter((item) => item.id !== id);
    mergeWithAllDays(updated);
  };

  return (
    <div className="ml-6 mr-6">
      {/* 멤버 */}
      <div className="mt-3 mb-10">
        <MemberListSection members={tripMembers} />
      </div>

      {/* 날짜 탭 */}
      <div className="mb-10">
        <ScheduleDayTabs
          days={days}
          selectedDay={selectedDay}
          onSelectDay={onSelectDay}
        />
      </div>

      {/* 제목 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Pin className="w-5 h-5 text-[var(--color-primary)] opacity-90" />
          <h2 className="text-lg font-semibold text-gray-700 tracking-tight">
            오늘의 일정
          </h2>
        </div>
        <span className="text-sm text-gray-400">
          {days.find((d) => d.day === selectedDay)?.date}
        </span>
      </div>

      {/* 일정 */}
      <ScheduleListSection
        day={selectedDay}
        schedules={currentSchedules}
        isEditMode={isEditMode}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onReorder={handleReorder}
        onEdit={handleEdit}
      />

      {/* 모달 */}
      {modalOpen && selectedSlot && (
        <ScheduleItemModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialItem={editingItem}
          slot={selectedSlot}
          selectedDay={selectedDay}
        />
      )}
    </div>
  );
}
