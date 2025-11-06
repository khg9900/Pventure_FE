import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import ScheduleItemCard from "./ScheduleItemCard";
import type { ScheduleItem } from "../types/schedule";
import { TIME_SLOTS, TIME_SLOT_ICONS } from "../constants/index";

interface Props {
  day: number;
  schedules: ScheduleItem[];
  isEditMode?: boolean;
  onAdd?: (slot: string) => void;
  onDelete?: (id: number) => void;
  onReorder?: (updated: ScheduleItem[]) => void;
  onEdit?: (item: ScheduleItem) => void;
}

export default function ScheduleListSection({
  day,
  schedules,
  isEditMode = false,
  onAdd,
  onDelete,
  onReorder,
  onEdit,
}: Props) {
  const grouped = TIME_SLOTS.reduce<Record<string, ScheduleItem[]>>((acc, slot) => {
    acc[slot] = schedules.filter((s) => s.timeSlot === slot);
    return acc;
  }, {});

  const visibleSlots = isEditMode
    ? TIME_SLOTS
    : TIME_SLOTS.filter((slot) => grouped[slot]?.length > 0);

  const handleDragEnd = (result: any) => {
    if (!result.destination || !onReorder) return;
    const { source, destination } = result;
    const moved = grouped[source.droppableId][source.index];
    if (!moved) return;

    const updated = schedules.map((s) =>
      s.id === moved.id
        ? { ...s, timeSlot: destination.droppableId as ScheduleItem["timeSlot"] }
        : s
    );

    onReorder(updated);
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
                        className={`flex items-center justify-between px-4 py-2 rounded-2xl mb-3 ${
                          isMeal
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
                            className={`flex items-center gap-1 text-sm ${
                              isMeal ? "text-white" : "text-[var(--color-primary)]"
                            } hover:opacity-80 transition`}
                          >
                            <Plus className="w-4 h-4" /> 일정 추가
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {list.map((item, index) => (
                          <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                            {(drag) => (
                              <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
                                <ScheduleItemCard
                                  item={item}
                                  isEditMode
                                  onDelete={onDelete}
                                  onClick={onEdit}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
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
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-2xl mb-3 ${
                    isMeal
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
                    {list.map((item) => (
                      <motion.div key={item.id} layout>
                        <ScheduleItemCard item={item} />
                      </motion.div>
                    ))}
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
