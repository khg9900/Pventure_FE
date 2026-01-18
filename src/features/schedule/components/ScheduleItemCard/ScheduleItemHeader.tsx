import { GripVertical, Trash2 } from "lucide-react";
import type { ScheduleResponseDto } from "@/features/schedule/types/schedule";
import type { PlaceResponseDto } from "@/features/place/types/place";
import { PLACE_TYPE_ICONS } from "@/features/place/constants";

interface Props {
  item: ScheduleResponseDto;
  place: PlaceResponseDto | null;
  isEditMode: boolean;
  dragHandleProps?: any;
  isChecked: boolean;
  onToggleCheck: () => void;
  onDelete?: (id: number) => void;
}

export default function ScheduleItemHeader({
  item,
  place,
  isEditMode,
  dragHandleProps,
  isChecked,
  onToggleCheck,
  onDelete,
}: Props) {
  const placeName = place?.name ?? "장소가 아직 정해지지 않았어요";
  const placeTypeLabel = place?.placeType ?? "미정";
  const placeIcon =
    (place && PLACE_TYPE_ICONS[place.placeType as keyof typeof PLACE_TYPE_ICONS]) ||
    "🤔";

  // 배지 기본 스타일 (색상 통일)
  const badgeBase =
    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0";
  const badgeStyle = "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700";

  return (
    <div className="flex items-start justify-between cursor-pointer select-none mb-2 gap-2">
      <div className="flex items-start gap-2 flex-1 min-w-0">
        {/* 드래그 핸들 (편집 모드에서만) */}
        {isEditMode && (
          <div className="flex items-center pt-0.5">
            <div
              {...(dragHandleProps ?? {})}
              className="flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="text-gray-400 w-4 h-4" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {/* 배지 */}
            <span className={`${badgeBase} ${badgeStyle}`}>
              <span className="text-sm">{placeIcon}</span>
              <span>{placeTypeLabel}</span>
            </span>

            {/* 장소 이름 */}
            <span
              className={`text-gray-800 font-medium transition-all truncate ${
                isChecked ? "line-through text-gray-400" : ""
              }`}
              title={placeName}
            >
              {placeName}
            </span>
          </div>
        </div>
      </div>

      {/* 우측 체크박스 또는 삭제 버튼 */}
      <div className="flex-shrink-0">
        {!isEditMode ? (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onToggleCheck}
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
  );
}
