import { useState } from "react";
import type { TripFormData } from "../types/form";

export function useTripForm() {
  const [form, setForm] = useState<TripFormData>({
    title: "",
    region: "",
    folder: "선택 안함",
    startDate: null,
    endDate: null,
    coverImage: null,
  });

  const updateField = <K extends keyof TripFormData>(
    key: K,
    value: TripFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () =>
    setForm({
      title: "",
      region: "",
      folder: "선택 안함",
      startDate: null,
      endDate: null,
      coverImage: null,
    });

  return { form, updateField, resetForm };
}
