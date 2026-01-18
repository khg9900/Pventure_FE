import { useState } from "react";
import TripDatePickerModal from "./TripDatePickerModal";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  mode: "date" | "period";
  setMode: (mode: "date" | "period") => void;

  startDate: Date | null;
  endDate: Date | null;

  onChangeStartDate: (date: Date | null) => void;
  onChangeEndDate: (date: Date | null) => void;

  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
}

export default function TripPeriodSelector({
  mode,
  setMode,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  period,
  setPeriod,
}: Props) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex gap-3 mb-3">
        {(["date", "period"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setMode(type)}
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
          {startDate && endDate ? (
            <>
              {startDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).replace(/\. /g, ".").replace(/\.$/, ".")} ~{" "}
              {endDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).replace(/\. /g, ".").replace(/\.$/, ".")}
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

      {showCalendar && (
        <TripDatePickerModal
          onClose={() => setShowCalendar(false)}
          onApply={(start, end) => {
            onChangeStartDate(start);
            onChangeEndDate(end);
            setShowCalendar(false);
          }}
        />
      )}
    </div>
  );
}
