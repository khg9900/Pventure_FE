// ScheduleSection.tsx
import { useState, useEffect } from "react";
import ScheduleDayTabs from "./ScheduleDayTabs";
import ScheduleListSection from "./ScheduleListSection";
import MemberListSection from "@/features/member/components/MemberListSection";
import { Pin } from "lucide-react";
import ScheduleItemModal from "./ScheduleItemModal/ScheduleItemModal";
import type { ScheduleResponseDto } from "../types/schedule";
import type { Member } from "@/features/member/types/member.type";
import type { PlaceResponseDto } from "@/features/place/types/place";

interface Props {
  tripMembers: Member[];
  days: { day: number; date: string }[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  grouped: Record<number, ScheduleResponseDto[]>; 
  loading?: boolean;
  error?: string | null;
  setSchedules?: (schedules: ScheduleResponseDto[]) => void;
  isEditMode?: boolean;
  places: Record<number, PlaceResponseDto | null>;
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
  places,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleResponseDto["timeSlot"] | null>(null);
  const [editingItem, setEditingItem] = useState<ScheduleResponseDto | null>(null);
  const [place, setPlace] = useState<PlaceResponseDto | null>(null);

  // 🔥 로컬 상태
  const [localSchedules, setLocalSchedules] = useState<Record<number, ScheduleResponseDto[]>>({});
  const [dirtyDays, setDirtyDays] = useState<Set<number>>(new Set());

  /** 초기 로딩 시 grouped 를 local 에 세팅 */
  useEffect(() => {
    if (Object.keys(localSchedules).length === 0) {
      setLocalSchedules({ ...grouped });
    }
  }, [grouped, localSchedules]);

  /** body 스크롤 락 */
  useEffect(() => {
    const body = document.querySelector("body");
    if (modalOpen) body?.classList.add("modal-open");
    else body?.classList.remove("modal-open");
  }, [modalOpen]);

  if (loading)
    return <div className="text-center py-20 text-gray-400 text-sm">일정 데이터를 불러오는 중입니다...</div>;
  if (error)
    return <div className="text-center py-20 text-red-400 text-sm">❌ {error}</div>;

  const currentSchedules = localSchedules[selectedDay] || [];

  /** 특정 day 의 로컬 상태 업데이트 + dirtyDay 반영 */
  const mergeWithLocal = (updated: ScheduleResponseDto[]) => {
    setLocalSchedules(prev => ({ ...prev, [selectedDay]: updated }));
    setDirtyDays(prev => new Set(prev).add(selectedDay));
  };

  /** 새 일정 추가 */
  const handleAdd = (slot: string) => {
    setSelectedSlot(slot as ScheduleResponseDto["timeSlot"]);
    setEditingItem(null);  
    setPlace(null);
    setModalOpen(true);
  };

  /** 수정 */
  const handleEdit = (item: ScheduleResponseDto) => {
    if (!isEditMode) return;
    setSelectedSlot(item.timeSlot);
    setEditingItem(item);
    setPlace(getPlaceForSchedule(item.id));
    setModalOpen(true);
  };

  /**
   * 🔥 핵심 로직
   * Schedule 저장 (추가/수정)
   * → timeSlot 이 같으면: 해당 그룹 안에서만 sequence 재배열
   * → timeSlot 이 변경되면: 원래 그룹에서 제거 + 새로운 timeSlot 그룹에 삽입
   */
  const handleSaveItem = (item: ScheduleResponseDto) => {
    const prev = [...currentSchedules];
    const isExisting = prev.some(s => s.id === item.id);

    let updated = [...prev];

    if (isExisting) {
      const before = prev.find(s => s.id === item.id)!;

      // ✔ 1. timeSlot 그대로 → 해당 timeSlot 내에서만 위치 정렬
      if (before.timeSlot === item.timeSlot) {
        updated = updated
          .map(s => (s.id === item.id ? item : s))
          .sort((a, b) => a.sequence - b.sequence)
          .map((s, idx) => ({ ...s, sequence: idx + 1 }));
      } 
      // ✔ 2. timeSlot 변경됨 → 다른 그룹으로 이동
      else {
        const removed = updated.filter(s => s.id !== item.id)
          .map((s, idx) => ({ ...s, sequence: idx + 1 }));

        const moved = [...removed, item]
          .sort((a, b) => a.sequence - b.sequence)
          .map((s, idx) => ({ ...s, sequence: idx + 1 }));

        updated = moved;
      }
    } 
    else {
      // 신규 생성 → 맨 뒤에 추가 후 sequence 재계산
      updated = [...updated, item]
        .sort((a, b) => a.sequence - b.sequence)
        .map((s, idx) => ({ ...s, sequence: idx + 1 }));
    }

    mergeWithLocal(updated);
    setModalOpen(false);
  };

  /** 삭제 */
  const handleDelete = (id: number) => {
    const updated = currentSchedules
      .filter(s => s.id !== id)
      .map((s, idx) => ({ ...s, sequence: idx + 1 }));

    mergeWithLocal(updated);
  };

  /**
   * 🔥 드래그 reordering
   * → 같은 timeSlot 안에서만 순서 변경 가능
   * → 백엔드는 sequence 기반으로 전부 정리해 줄 것
   */
  const handleReorder = (updated: ScheduleResponseDto[]) => {
    const newSequence = updated.map((s, idx) => ({
      ...s,
      sequence: idx + 1,
    }));
    mergeWithLocal(newSequence);
  };

  /** place 매핑 */
  const getPlaceForSchedule = (scheduleId: number) => places[scheduleId] || null;

  /** 저장 전체 */
  const handleSaveAll = () => {
    if (setSchedules) {
      const updates = Array.from(dirtyDays).flatMap(day => localSchedules[day]);
      setSchedules(updates);
    }
    setDirtyDays(new Set());
    alert("✅ 변경된 일정 저장 완료");
  };

  return (
    <div className="ml-6 mr-6 flex flex-col min-h-screen">
      <div className="mt-3 mb-10">
        <MemberListSection members={tripMembers} />
      </div>

      <div className="mb-10">
        <ScheduleDayTabs days={days} selectedDay={selectedDay} onSelectDay={onSelectDay} />
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Pin className="w-5 h-5 text-[var(--color-primary)] opacity-90" />
          <h2 className="text-lg font-semibold text-gray-700 tracking-tight">오늘의 일정</h2>
        </div>
        <span className="text-sm text-gray-400">{days.find(d => d.day === selectedDay)?.date}</span>
      </div>

      <div className="flex-1 overflow-auto">
        <ScheduleListSection
          day={selectedDay}
          schedules={currentSchedules}
          isEditMode={isEditMode}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onReorder={handleReorder}
          onEdit={handleEdit}
          places={currentSchedules.reduce((acc, s) => {
            acc[s.id] = getPlaceForSchedule(s.id);
            return acc;
          }, {} as Record<number, PlaceResponseDto | null>)}
        />
      </div>

      {isEditMode && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={handleSaveAll}
            className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold shadow-md hover:bg-[var(--color-primary-light)] transition-all"
          >
            저장하기
          </button>
        </div>
      )}

      {modalOpen && selectedSlot && (
        <ScheduleItemModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveItem}
          Schedule={editingItem}
          place={place}
          slot={selectedSlot}
          selectedDay={selectedDay}
        />
      )}
    </div>
  );
}
