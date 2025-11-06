import { useState } from "react";
import { Folder, CalendarCheck, MapPin, Bookmark } from "lucide-react";
import { useTripForm } from "../hooks/useTripForm";
import { createTrip } from "../api/trip.api";
import TripDatePickerModal from "./TripDatePickerModal";
import FolderSelect from "@/features/folder/components/FolderSelect";
import SectionField from "./SectionField";
import { useNavigate } from "react-router-dom";
import { useFolders } from "@/features/folder/hooks/useFolders";
import type { TripCreatePayload } from "../types/form";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

interface TripFormProps {
  coverFile?: File | null;
}

export default function TripForm({ coverFile }: TripFormProps) {
  const { form, updateField, resetForm } = useTripForm();
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"date" | "period">("date");
  const [period, setPeriod] = useState(0);
  const navigate = useNavigate();

  const { folders } = useFolders();

  const folderId =
    form.folder === "선택 안함"
      ? null
      : folders.find((f) => f.name === form.folder)?.id ?? null;

  const toISO = (d: Date | null) => (d ? new Date(d).toISOString() : null);

  const buildPayload = (): TripCreatePayload => {
    if (mode === "date" && form.startDate && form.endDate) {
      const days =
        Math.round(
          (form.endDate.getTime() - form.startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      return {
        title: form.title,
        region: form.region,
        folderId,
        startDate: toISO(form.startDate),
        endDate: toISO(form.endDate),
        days,
        coverImage: coverFile ?? null,
        status: "예정",
        destinations: [form.region],
        participants: 1,
      };
    }

    return {
      title: form.title,
      region: form.region,
      folderId,
      startDate: null,
      endDate: null,
      days: period + 1,
      coverImage: coverFile ?? null,
      status: "예정",
      destinations: [form.region],
      participants: 1,
    };
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return alert("여행 제목을 입력해주세요");
    if (!form.region.trim()) return alert("여행 지역을 입력해주세요");
    if (mode === "date" && (!form.startDate || !form.endDate))
      return alert("여행 기간을 선택해주세요");

    setLoading(true);
    try {
      const payload = buildPayload();

      if (USE_MOCK) {
        console.log("Mock trip created:", payload);
      } else {
        await createTrip(payload);
      }

      alert("여행이 생성되었습니다");
      navigate("/folders");
      resetForm();
      setMode("date");
      setPeriod(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 animate-fadeIn">

      <SectionField icon={<Bookmark />} label="여행 제목">
        <input
          type="text"
          placeholder="여행 제목을 입력하세요"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3 
                     text-[var(--color-text-main)] placeholder-[var(--color-text-sub)]
                     focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
        />
      </SectionField>

      <SectionField icon={<MapPin />} label="여행 지역">
        <input
          type="text"
          placeholder="예: 도쿄, 제주"
          value={form.region}
          onChange={(e) => updateField("region", e.target.value)}
          className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3 
                     text-[var(--color-text-main)] placeholder-[var(--color-text-sub)]
                     focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
        />
      </SectionField>

      <SectionField icon={<CalendarCheck />} label="여행 기간">
        <div className="flex gap-3 mb-3">
          {["date", "period"].map((type) => (
            <button
              key={type}
              onClick={() => setMode(type as "date" | "period")}
              className={`flex-1 py-2 rounded-lg border text-sm transition ${
                mode === type
                  ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-light)]"
                  : "border-[var(--color-border)] text-[var(--color-text-sub)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {type === "date" ? "날짜 지정" : "기간 선택"}
            </button>
          ))}
        </div>

        {mode === "date" ? (
          <button
            onClick={() => setShowCalendar(true)}
            className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3 text-left 
                       text-[var(--color-text-main)] hover:bg-[var(--color-surface)] transition"
          >
            {form.startDate && form.endDate ? (
              <>
                {form.startDate.toLocaleDateString("ko-KR")} ~{" "}
                {form.endDate.toLocaleDateString("ko-KR")}
              </>
            ) : (
              <span className="text-[var(--color-text-sub)]">
                여행 기간을 선택하세요
              </span>
            )}
          </button>
        ) : (
          <div className="border border-[var(--color-border)] rounded-lg px-4 py-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-[var(--color-text-main)] font-medium">
                {period === 0
                  ? "당일 일정이에요."
                  : `${period}박 ${period + 1}일 일정`}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPeriod((p) => Math.max(0, p - 1))}
                  className="px-2 py-0 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)]"
                >
                  -
                </button>
                <span className="w-8 text-center text-[var(--color-text-main)]">
                  {period}
                </span>
                <button
                  onClick={() => setPeriod((p) => p + 1)}
                  className="px-2 py-0 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </SectionField>

      <SectionField icon={<Folder />} label="폴더 선택">
        <FolderSelect
          selected={form.folder}
          onChange={(folderName) => updateField("folder", folderName)}
        />
      </SectionField>

      <div className="mt-6 flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex-1 bg-[var(--color-primary)] text-white font-semibold rounded-xl py-3 hover:opacity-90 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "생성 중..." : "여행 생성하기"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-surface)]"
        >
          초기화
        </button>
      </div>

      {showCalendar && (
        <TripDatePickerModal
          onClose={() => setShowCalendar(false)}
          onApply={(start, end) => {
            updateField("startDate", start);
            updateField("endDate", end);
            setShowCalendar(false);
          }}
        />
      )}
    </div>
  );
}
