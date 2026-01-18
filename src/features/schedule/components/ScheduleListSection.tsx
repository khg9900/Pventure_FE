import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import ScheduleItemCard from "@/features/schedule/components/ScheduleItemCard/ScheduleItemCard";
import { TIME_SLOTS, TIME_SLOT_ICONS } from "../constants/index";
import type { ScheduleResponseDto, TimeSlot } from "../types/schedule";
import type { PlaceResponseDto } from "@/features/place/types/place";

interface Props {
  day: number;
  schedules: ScheduleResponseDto[];
  isEditMode?: boolean;
  onAdd?: (slot: string) => void;
  onDelete?: (id: number) => void;
  onReorder?: (updated: ScheduleResponseDto[]) => void;
  onEdit?: (item: ScheduleResponseDto) => void;
  places: Record<number, PlaceResponseDto | null>;
}

export default function ScheduleListSection({
  day,
  schedules,
  isEditMode = false,
  onAdd,
  onDelete,
  onReorder,
  onEdit,
  places,
}: Props) {
  const grouped = TIME_SLOTS.reduce<Record<TimeSlot, ScheduleResponseDto[]>>(
    (acc, slot) => {
      acc[slot] = schedules.filter((s) => s.timeSlot === slot);
      return acc;
    },
    {} as Record<TimeSlot, ScheduleResponseDto[]>
  );

  const visibleSlots = isEditMode
    ? TIME_SLOTS
    : TIME_SLOTS.filter((slot) => grouped[slot]?.length > 0);

  interface DragLocation {
    droppableId: TimeSlot;
    index: number;
  }

  const reorderLists = (
    lists: Record<TimeSlot, ScheduleResponseDto[]>,
    source: DragLocation,
    destination: DragLocation
  ): Record<TimeSlot, ScheduleResponseDto[]> => {
    const sourceList = [...(lists[source.droppableId] || [])];
    const destList =
      source.droppableId === destination.droppableId
        ? sourceList
        : [...(lists[destination.droppableId] || [])];

    const [movedItem] = sourceList.splice(source.index, 1);
    const updatedItem: ScheduleResponseDto = {
      ...movedItem,
      timeSlot: destination.droppableId,
    };

    destList.splice(destination.index, 0, updatedItem);

    return {
      ...lists,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    };
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !onReorder) return;
    const { source, destination, draggableId } = result;

    // 🔹 드래그 전 전체 flatten
    const flattenedBefore = Object.values(grouped).flatMap((list) => list);

    const listsAfter = reorderLists(grouped, source, destination);

    // 🔹 드래그 후 전체 flatten
    let flattenedAfter = Object.values(listsAfter).flatMap((list) => list);
    flattenedAfter = Array.from(new Map(flattenedAfter.map((s) => [s.id, s])).values());

    // 이동 전/후 index (flattened 기준)
    const originalIndex = flattenedBefore.findIndex((s) => s.id === +draggableId);
    const newIndex = flattenedAfter.findIndex((s) => s.id === +draggableId);

    console.log(
      `📌 드래그된 아이템 ID: ${draggableId}, 이전 순서: ${originalIndex + 1}, 새 순서: ${newIndex + 1}`
    );

    // sequence 재계산
    const withSequence = flattenedAfter.map((s, idx) => ({
      ...s,
      sequence: idx + 1,
    }));

    onReorder(withSequence);
  };

  if (!schedules || schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-sm">
        <p>아직 일정이 없습니다 🗓️</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`day-${day}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-5 mx-1"
      >
        {isEditMode ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            {TIME_SLOTS.map((slot) => {
              const list = grouped[slot] || [];
              const isMeal = ["아침식사", "점심식사", "저녁식사"].includes(slot);

              return (
                <Droppable droppableId={slot} key={slot}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="mb-8">
                      <div
                        className={`flex items-center justify-between px-4 py-2 rounded-2xl mb-3 ${isMeal
                          ? "bg-[var(--color-primary-border)] text-white"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <h2 className="text-base flex items-center gap-2 font-medium">
                          {TIME_SLOT_ICONS[slot]} {slot}
                        </h2>

                        {onAdd && (
                          <button
                            onClick={() => onAdd(slot)}
                            className={`flex items-center gap-1 text-sm ${isMeal ? "text-white" : "text-[var(--color-primary)]"
                              } hover:opacity-80 transition`}
                          >
                            <Plus className="w-4 h-4" /> 일정 추가
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {list.map((item, index) => {
                          const place = places[item.id];
                          return (
                            <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                              {(drag) => (
                                <div
                                  ref={drag.innerRef}
                                  {...drag.draggableProps}
                                  {...drag.dragHandleProps}
                                >
                                  <ScheduleItemCard
                                    item={item}
                                    place={place}
                                    isEditMode
                                    onDelete={onDelete}
                                    onClick={onEdit}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}

                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </DragDropContext>
        ) : (
          visibleSlots.map((slot) => {
            const list = grouped[slot] || [];
            const isMeal = ["아침식사", "점심식사", "저녁식사"].includes(slot);

            return (
              <div key={slot} className="mb-8">
                <div
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-2xl mb-3 ${isMeal
                    ? "bg-[var(--color-primary-border)] text-white"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  <h2 className="text-base flex items-center gap-2 font-medium">
                    {TIME_SLOT_ICONS[slot]} {slot}
                  </h2>
                </div>

                {list.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {list.map((item) => {
                      const place = places[item.id];
                      return (
                        <motion.div key={item.id} layout>
                          <ScheduleItemCard item={item} place={place} />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </motion.div>
    </AnimatePresence>
  );
}
