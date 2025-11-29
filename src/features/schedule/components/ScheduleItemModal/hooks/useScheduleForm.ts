// components/ScheduleItemModal/hooks/useScheduleForm.ts
import { useState, useEffect } from "react";
import type { ScheduleResponseDto } from "@/features/schedule/types/schedule";
export type ReturnTypeOfUseScheduleForm = {
  memo: string;
  setMemo: (value: string) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  validateFields: () => string[];
  buildScheduleData: () => ScheduleResponseDto;
};

export function useScheduleForm(
  open: boolean,
  Schedule: ScheduleResponseDto | null | undefined,
  selectedDay: number,
  slot: ScheduleResponseDto["timeSlot"]
): ReturnTypeOfUseScheduleForm {
  const [memo, setMemo] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // open 될 때 초기화
  useEffect(() => {
    if (open) {
      setMemo(Schedule?.memo ?? "");
      setFocusedField(null);
      setErrors({});
    }
  }, [open, Schedule]);

  // 유효성 검사
  const validateFields = (): string[] => {

    return []
  };

  // Schedule 객체 생성
  const buildScheduleData = (): ScheduleResponseDto => ({
    id: Schedule?.id ?? Date.now(),
    day: selectedDay,
    timeSlot: slot,
    isCompleted: Schedule?.isCompleted ?? false,
    sequence: Schedule?.sequence ?? 1,
    memo,
  });

  return {
    memo,
    setMemo,
    focusedField,
    setFocusedField,
    validateFields,
    buildScheduleData,
  };
}
