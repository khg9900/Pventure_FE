import { useMemo, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Trip } from "../types/trip.type";
import { isSameDate } from "../../../shared/utils/dateUtils";
import MonthSelectModal from "./MonthSelectModal";

interface CalendarSectionProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
  trips: Trip[];
  onTripSelect: (trip: Trip | null) => void;
}

type Segment = {
  trip: Trip;
  row: number;
  colStart: number;
  colEnd: number;
  isStartEdge: boolean;
  isEndEdge: boolean;
};

export default function CalendarSection({
  currentDate,
  onMonthChange,
  trips,
  onTripSelect,
}: CalendarSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const datesGridRef = useRef<HTMLDivElement>(null);
  const sampleCellRef = useRef<HTMLButtonElement>(null);

  const [cellH, setCellH] = useState(0);
  const [gapPx, setGapPx] = useState(0);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const today = new Date();

  const normalizeDate = (input: any): Date => {
    if (input instanceof Date) return input;
    if (typeof input === "string") {
      const s = input.replace(/\./g, "-").replace(/\s+/g, "").replace(/-$/, "");
      return new Date(s);
    }
    return new Date(input);
  };

  const getMonthInfo = (d: Date) => {
    const y = d.getFullYear();
    const m = d.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const daysInMonth = last.getDate();
    const startDay = first.getDay();
    const rows = Math.ceil((startDay + daysInMonth) / 7);
    return { y, m, daysInMonth, startDay, rows };
  };

  const { y, m, daysInMonth, startDay, rows } = useMemo(
    () => getMonthInfo(currentDate),
    [currentDate]
  );

  const monthStart = useMemo(() => new Date(y, m, 1), [y, m]);
  const monthEnd = useMemo(() => new Date(y, m + 1, 0), [y, m]);

  const visibleTrips = useMemo(
    () =>
      trips.filter((t) => {
        const s = normalizeDate(t.startDate);
        const e = normalizeDate(t.endDate);
        return e >= monthStart && s <= monthEnd;
      }),
    [trips, monthStart, monthEnd]
  );

  const segments: Segment[] = useMemo(() => {
    const segs: Segment[] = [];
    const dayToGrid = (day: number) => {
      const idx = startDay + (day - 1);
      const row = Math.floor(idx / 7) + 1;
      const col = (idx % 7) + 1;
      return { row, col };
    };

    for (const trip of visibleTrips) {
      const s = normalizeDate(trip.startDate);
      const e = normalizeDate(trip.endDate);
      const tripStartDay = Math.max(1, s.getMonth() === m ? s.getDate() : 1);
      const tripEndDay = Math.min(
        daysInMonth,
        e.getMonth() === m ? e.getDate() : daysInMonth
      );

      let day = tripStartDay;
      while (day <= tripEndDay) {
        const { row, col: colStart } = dayToGrid(day);
        const wd = new Date(y, m, day).getDay();
        const lastDayThisWeek = Math.min(tripEndDay, day + (6 - wd));
        const { col: colEnd } = dayToGrid(lastDayThisWeek);

        segs.push({
          trip,
          row,
          colStart,
          colEnd,
          isStartEdge: day === tripStartDay && s.getMonth() === m,
          isEndEdge: lastDayThisWeek === tripEndDay && e.getMonth() === m,
        });

        day = lastDayThisWeek + 1;
      }
    }
    return segs;
  }, [visibleTrips, y, m, daysInMonth, startDay]);

  useEffect(() => {
    const measure = () => {
      const cell = sampleCellRef.current;
      const grid = datesGridRef.current;
      if (!cell || !grid) return;
      const h = cell.getBoundingClientRect().height;
      const styles = getComputedStyle(grid);
      const gap = parseFloat(styles.rowGap || styles.gap || "0");
      setCellH(h);
      setGapPx(gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [currentDate]);

  return (
    <div
      ref={wrapperRef}
      className="bg-[var(--color-bg)] border border-[var(--color-border)] 
                 rounded-2xl shadow-sm p-6 mb-6 relative overflow-hidden transition-colors"
    >

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onMonthChange(new Date(y, m - 1, 1))}
            className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-text-sub)]" />
          </button>

          <h2
            onClick={() => setShowMonthPicker(true)}
            className="text-xl font-bold text-[var(--color-text-main)] cursor-pointer 
                       hover:text-[var(--color-primary)] transition"
          >
            {y}년 {m + 1}월
          </h2>

          <button
            onClick={() => onMonthChange(new Date(y, m + 1, 1))}
            className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-text-sub)]" />
          </button>
        </div>

        <button
          onClick={() => onMonthChange(new Date())}
          className="px-3 py-1 text-sm rounded-md bg-[var(--color-surface)] 
                     text-[var(--color-text-sub)] hover:bg-[var(--color-primary-light)]"
        >
          Today
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
          <div
            key={d}
            className={`text-center font-semibold text-sm ${
              i === 0
                ? "text-[#FF6E6E]"
                : i === 6
                ? "text-[#4A90E2]"
                : "text-[var(--color-text-sub)]"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="relative">
        <div ref={datesGridRef} className="grid grid-cols-7 gap-2 relative z-20">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(y, m, day);
            const isToday = isSameDate(today, date);
            const refProp = i === 0 ? { ref: sampleCellRef } : {};

            return (
              <button
                key={day}
                {...refProp}
                onClick={() => onTripSelect(null)}
                className="aspect-square relative flex items-center justify-center 
                           rounded-full transition-colors hover:bg-[var(--color-surface)]"
              >
                {isToday && (
                  <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="h-10 w-10 rounded-full bg-[var(--color-primary-light)]" />
                  </div>
                )}
                <span
                  className={`relative text-sm font-medium z-10 ${
                    isToday
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-main)]"
                  }`}
                >
                  {day}
                </span>
              </button>
            );
          })}

          {Array.from({ length: rows * 7 - (startDay + daysInMonth) }).map(
            (_, i) => (
              <div key={`tail-${i}`} className="aspect-square" />
            )
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: cellH
              ? `repeat(${rows}, ${cellH}px)`
              : undefined,
            columnGap: `${gapPx}px`,
            rowGap: `${gapPx}px`,
          }}
        >
          {segments.map((s, idx) => (
            <div
              key={`${s.trip.id}-${idx}`}
              style={{
                gridRow: s.row,
                gridColumn: `${s.colStart} / ${s.colEnd + 1}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: s.isStartEdge ? "7%" : "3%",
                  right: s.isEndEdge ? "7%" : "3%",
                  top: cellH ? `${cellH * 1}px` : "100%",
                  height: "5px",
                  background:
                    "linear-gradient(90deg, var(--color-secondary), var(--color-primary))",
                  borderRadius: "9999px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {showMonthPicker && (
        <MonthSelectModal
          onClose={() => setShowMonthPicker(false)}
          onSelect={(date) => {
            onMonthChange(date);
            setShowMonthPicker(false);
          }}
        />
      )}
    </div>
  );
}
