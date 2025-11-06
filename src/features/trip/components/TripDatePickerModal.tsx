import { useState, useEffect, useRef } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { ko } from "date-fns/locale";

interface TripDatePickerModalProps {
  onClose: () => void;
  onApply: (start: Date, end: Date) => void;
  mode?: "range" | "month";
}

export default function TripDatePickerModal({
  onClose,
  onApply,
  mode = "range",
}: TripDatePickerModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [monthCount, setMonthCount] = useState(2);
  const today = new Date();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDateClick = (day: Date) => {
    if (mode === "month") {
      const start = startOfMonth(day);
      const end = endOfMonth(day);
      onApply(start, end);
      onClose();
      return;
    }
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const inRange = (day: Date) => {
    if (!startDate || !endDate) return false;
    return isAfter(day, startDate) && isBefore(day, endDate);
  };

  const months = Array.from({ length: monthCount }, (_, i) => addMonths(today, i));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
        setMonthCount((prev) => prev + 1);
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const nights =
    startDate && endDate
      ? Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg)] rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
          {mode === "month" ? "월 선택" : "여행 기간 선택"}
        </h3>

        <div
          ref={scrollRef}
          className="max-h-[400px] overflow-y-auto text-center mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {months.map((month) => {
            const start = startOfMonth(month);
            const end = endOfMonth(month);
            const days = eachDayOfInterval({ start, end });
            const offset = getDay(start);
            const paddedDays = [...Array(offset).fill(null), ...days];

            return (
              <div key={month.toISOString()} className="mb-6 border-b border-[var(--color-border)] pb-4">
                <h4 className="text-[var(--color-primary)] font-bold mb-3 text-base">
                  {format(month, "yyyy년 M월", { locale: ko })}
                </h4>
                <div className="grid grid-cols-7 text-sm mb-2 font-medium text-[var(--color-text-sub)]">
                  {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 justify-items-center">
                  {paddedDays.map((day, idx) => {
                    if (!day) return <div key={idx} className="h-10 w-10" />;
                    const isStart = startDate && isSameDay(day, startDate);
                    const isEnd = endDate && isSameDay(day, endDate);
                    const isInRange = inRange(day);
                    const isToday = isSameDay(day, today);

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => handleDateClick(day)}
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition ${
                          isStart || isEnd
                            ? "bg-[var(--color-primary)] text-white"
                            : isInRange
                            ? "bg-[var(--color-primary-light)]"
                            : isToday
                            ? "border border-[var(--color-primary)]"
                            : "hover:bg-[var(--color-surface)]"
                        }`}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {mode === "range" && (
          <>
            <div className="text-center mb-4 text-sm">
              {startDate && endDate ? (
                <>
                  <strong className="text-[var(--color-primary)]">
                    {format(startDate, "yyyy. M. d.", { locale: ko })} ~{" "}
                    {format(endDate, "yyyy. M. d.", { locale: ko })}
                  </strong>
                  <div className="text-[var(--color-text-sub)] mt-1">
                    {nights > 0
                      ? `${nights}박 ${nights + 1}일 일정`
                      : "당일 일정"}
                  </div>
                </>
              ) : (
                <span className="text-[var(--color-text-sub)]">기간을 선택하세요</span>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-sub)] hover:bg-[var(--color-surface)]"
              >
                취소
              </button>
              <button
                disabled={!startDate || !endDate}
                onClick={() => startDate && endDate && onApply(startDate, endDate)}
                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-semibold disabled:opacity-40"
              >
                적용
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
