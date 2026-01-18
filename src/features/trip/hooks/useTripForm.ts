import { useState } from "react";

/**
 * TripForm 전용 UI 상태
 * - API / DTO / Payload 와 완전히 분리
 * - 외부 export ❌
 */
interface TripFormState {
  title: string;
  region: string;
  folder: string;
  startDate: Date | null;
  endDate: Date | null;
  coverImage: File | null;
}

const INITIAL_FORM: TripFormState = {
  title: "",
  region: "",
  folder: "선택 안함",
  startDate: null,
  endDate: null,
  coverImage: null,
};

export function useTripForm() {
  const [form, setForm] = useState<TripFormState>(INITIAL_FORM);

  const updateField = <K extends keyof TripFormState>(
    key: K,
    value: TripFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
  };

  return {
    form,
    setForm,
    updateField,
    resetForm,
  };
}
