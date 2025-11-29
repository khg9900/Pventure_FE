// hooks/usePlaceScheduleForm.ts
import { usePlaceForm } from "./usePlaceForm";
import { useScheduleForm } from "@/features/schedule/components/ScheduleItemModal/hooks/useScheduleForm";
import type { PlaceResponseDto } from "@/features/place/types/place";
import type { ScheduleResponseDto } from "@/features/schedule/types/schedule";

export function usePlaceScheduleForm(
  initialPlace: PlaceResponseDto | null,
  initialSchedule?: ScheduleResponseDto | null,
  selectedDay?: number,
  slot?: ScheduleResponseDto["timeSlot"]
) {
  // placeForm
  const placeForm = usePlaceForm(initialPlace);

  // scheduleForm
  const scheduleForm = useScheduleForm(
    true,
    initialSchedule ?? null,
    selectedDay ?? 1,
    slot ?? "아침식사"
  );

  // 통합 validate (모든 errors 상태를 갱신)
  const validateFields = (): string[] => {
    const placeValid = placeForm.validateFields();
    const scheduleValid = scheduleForm.validateFields();
    return [...placeValid, ...scheduleValid];
  };

  // build 함수는 최신 상태 참조
  const buildPlaceData = () => placeForm.buildPlaceData();
  const buildScheduleData = () => scheduleForm.buildScheduleData();

  return {
    place: placeForm,           // placeForm 네임스페이스
    schedule: scheduleForm,     // scheduleForm 네임스페이스
    validateFields,
    buildPlaceData,
    buildScheduleData,
  };
}
