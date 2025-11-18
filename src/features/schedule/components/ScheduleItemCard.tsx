import { useState } from "react";
import { MessageSquare, GripVertical, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ScheduleResponseDto } from "../types/schedule";
import type { PlaceResponseDto } from "@/features/place/types/place";
import PlaceItemCard from "@/features/place/components/PlaceItemCard";
import { type PlaceType, PLACE_TYPE_ICONS } from "@/features/place/constants";

interface ScheduleItemCardProps {
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
}: ScheduleItemCardProps) {
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
      {/* 헤더 */}
      <div className="flex items-start justify-between cursor-pointer select-none mb-2 gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {isEditMode && (
            <div className="flex items-center pt-0.5">
              <div
                {...dragHandleProps}
                className="flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="text-gray-400 w-4 h-4" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {place && place.placeType && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs font-medium text-blue-700 whitespace-nowrap flex-shrink-0">
                  <span className="text-sm">{PLACE_TYPE_ICONS[place.placeType]}</span>
                  <span>{place.placeType}</span>
                </span>
              )}
              <span
                className={`text-gray-800 font-medium transition-all truncate ${
                  isChecked ? "line-through text-gray-400" : ""
                }`}
              >
                {place ? place.name : "이 시간대에 장소 정보가 없습니다."}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          {!isEditMode ? (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleCheck}
              className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[var(--color-primary-border)] checked:border-[var(--color-primary-border)] flex items-center justify-center relative after:content-['✓'] after:text-white after:text-[10px] after:absolute"
            />
          ) : (
            onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* 상세 내용: 장소 + 메모 같은 박스 */}
      <AnimatePresence initial={false}>
        {(!isChecked || isEditMode) && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border border-[var(--color-primary-border)] rounded-xl ml-5 mt-2 p-3 bg-white box-border">
              {place && <PlaceItemCard place={place} memo={item.memo} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}