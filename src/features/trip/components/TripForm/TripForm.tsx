import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// hooks / api
import { useTripForm } from "@/features/trip/hooks/useTripForm";
import { createTrip, updateTrip } from "@/features/trip/api/trip.api";
import { useFolders } from "@/features/folder/hooks/useFolders";

// components
import TripTitleInput from "./TripTitleInput";
import TripRegionInput from "./TripRegionInput";
import TripPeriodSelector from "./TripPeriodSelector";
import TripFolderSelect from "./TripFolderSelect";
import TripMemberInvite from "./TripMemberInvite";

// types
import type { TripStatus} from "@/features/trip/types/trip.type";
import type { TripResponseDto } from "@/features/trip/types/trip.dto";
import type {
  TripCreatePayload,
  TripUpdatePayload,
} from "@/features/trip/types/trip.payload";

interface TripFormProps {
  coverFile?: File | null;
  editMode?: boolean;
  initialTrip?: TripResponseDto | null;
}

export default function TripForm({
  coverFile,
  editMode = false,
  initialTrip = null,
}: TripFormProps) {
  const navigate = useNavigate();
  const { folders } = useFolders();
  const { form, updateField, resetForm, setForm } = useTripForm();

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"date" | "period">("date");
  const [period, setPeriod] = useState(0);

  /* ---------------- util ---------------- */

  const toISO = (d: Date | null) => (d ? d.toISOString() : null);

  const resolveFolderId = (folderName: string) =>
    folders.find((f) => f.name === folderName)?.id ?? null;

  const resolveFolderName = (folderId: number | null | undefined) => {
    if (!folderId) return "선택 안함";
    const folder = folders.find((f) => f.id === folderId);
    return folder?.name ?? "선택 안함";
  };

  /* ---------------- edit init ---------------- */

  useEffect(() => {
    if (!editMode || !initialTrip) return;

    setForm({
      title: initialTrip.title,
      region: initialTrip.region ?? "",
      folder: resolveFolderName(initialTrip.folderId),
      startDate: initialTrip.startDate
        ? new Date(initialTrip.startDate)
        : null,
      endDate: initialTrip.endDate
        ? new Date(initialTrip.endDate)
        : null,
      coverImage: null,
    });
  }, [editMode, initialTrip, folders, setForm]);

  /* ---------------- payload ---------------- */

  const buildPayload = (): TripCreatePayload | TripUpdatePayload => {
    const isDateMode = mode === "date" && form.startDate && form.endDate;

    const days = isDateMode
      ? Math.round(
          (form.endDate!.getTime() - form.startDate!.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : period + 1;

    const base = {
      title: form.title.trim(),
      region: form.region.trim(),
      startDate: isDateMode ? toISO(form.startDate) : null,
      endDate: isDateMode ? toISO(form.endDate) : null,
      days,
      coverImage: coverFile ?? null,
      status: "예정" as TripStatus,
      destinations: [form.region],
      participants: 1,
      folderId: resolveFolderId(form.folder),
    };

    return editMode && initialTrip
      ? { tripId: initialTrip.id, ...base }
      : base;
  };

  /* ---------------- submit ---------------- */

  const handleSubmit = async () => {
    if (!form.title.trim()) return alert("여행 제목을 입력해주세요");
    if (!form.region.trim()) return alert("여행 지역을 입력해주세요");
    if (mode === "date" && (!form.startDate || !form.endDate))
      return alert("여행 기간을 선택해주세요");

    setLoading(true);
    try {
      const payload = buildPayload();

      editMode && initialTrip
        ? await updateTrip(initialTrip.id, payload as TripUpdatePayload)
        : await createTrip(payload as TripCreatePayload);

      alert(editMode ? "여행이 수정되었습니다" : "여행이 생성되었습니다");
      navigate("/folders");
      resetForm();
      setMode("date");
      setPeriod(0);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- render ---------------- */

  return (
    <div className="w-full max-w-md mx-auto p-6 animate-fadeIn">
      <TripTitleInput
        value={form.title}
        onChange={(v) => updateField("title", v)}
      />

      <TripRegionInput
        value={form.region}
        onChange={(v) => updateField("region", v)}
      />

<TripPeriodSelector
  mode={mode}
  setMode={setMode}
  startDate={form.startDate}
  endDate={form.endDate}
  onChangeStartDate={(d) => updateField("startDate", d)}
  onChangeEndDate={(d) => updateField("endDate", d)}
  period={period}
  setPeriod={setPeriod}
/>

      <TripFolderSelect
        selected={form.folder}
        onChange={(f) => updateField("folder", f)}
      />

      <TripMemberInvite />

      <div className="mt-6 flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex-1 bg-[var(--color-primary)] text-white font-semibold rounded-xl py-3 hover:opacity-90 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading
            ? "처리 중..."
            : editMode
            ? "여행 수정하기"
            : "여행 생성하기"}
        </button>

        {!editMode && (
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-surface)]"
          >
            초기화
          </button>
        )}
      </div>
    </div>
  );
}
