import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ScheduleResponseDto } from "@/features/schedule/types/schedule";
import type { PlaceResponseDto } from "@/features/place/types/place";
import ScheduleItemHeader from "./ScheduleItemHeader";
import ScheduleItemDetail from "./ScheduleItemDetail";

interface Props {
  item: ScheduleResponseDto;
  place: PlaceResponseDto | null;
  isEditMode?: boolean;
  dragHandleProps?: any;
  onDelete?: (id: number) => void;
  onClick?: (item: ScheduleResponseDto) => void;
}

export default function ScheduleItemCard({
  item,
  place,
  isEditMode = false,
  dragHandleProps,
  onDelete,
  onClick,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    if (!isEditMode) setIsChecked((prev) => !prev);
  };

  return (
    <motion.div
      layout
      className="bg-white p-3 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
      onClick={() => {
        if (isEditMode && onClick) onClick(item);
      }}
    >
      <ScheduleItemHeader
        item={item}
        place={place}
        isEditMode={isEditMode}
        dragHandleProps={dragHandleProps}
        isChecked={isChecked}
        onToggleCheck={toggleCheck}
        onDelete={onDelete}
      />

      <AnimatePresence initial={false}>
        {(!isChecked || isEditMode) && (
          <ScheduleItemDetail place={place} memo={item.memo} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
