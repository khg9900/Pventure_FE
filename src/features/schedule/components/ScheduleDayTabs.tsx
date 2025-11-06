import { useRef, useState, useEffect } from "react";

interface ScheduleDayTabsProps {
  days: { day: number; date: string }[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export default function ScheduleDayTabs({
  days,
  selectedDay,
  onSelectDay,
}: ScheduleDayTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isCentered, setIsCentered] = useState(false);

  const centerByIndex = (index: number) => {
    const container = scrollRef.current;
    const button = buttonRefs.current[index];
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();

    const offset =
      btnRect.left - containerRect.left - containerRect.width / 2 + btnRect.width / 2;

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const idx = days.findIndex((d) => d.day === selectedDay);
    if (idx >= 0) centerByIndex(idx);
  }, [selectedDay, days.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkCenter = () => {
      const contentWidth = container.scrollWidth;
      const viewWidth = container.clientWidth;
      setIsCentered(contentWidth <= viewWidth);
    };

    checkCenter();

    window.addEventListener("resize", checkCenter);
    return () => window.removeEventListener("resize", checkCenter);
  }, [days.length]);

  return (
    <div
      ref={scrollRef}
      className={`flex items-center ${
        isCentered ? "justify-center" : "justify-start"
      } gap-6 mb-5 overflow-x-auto no-scrollbar px-4 scroll-smooth`}
    >
      {days.map(({ day }, index) => {
        const isSelected = selectedDay === day;
        const isLast = index === days.length - 1;

        return (
          <div key={day} className="flex items-center flex-shrink-0">
            <button
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => {
                onSelectDay(day);
                centerByIndex(index);
              }}
              className={`relative flex flex-col items-center transition-all duration-300 ${
                isSelected ? "text-[var(--color-primary)]" : "text-gray-400"
              }`}
            >
              <div
                className={`w-3 h-3 mb-2 rounded-full border-2 transition-all ${
                  isSelected
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] scale-110"
                    : "border-gray-300"
                }`}
              ></div>

              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-[var(--color-primary)]" : "text-gray-500"
                }`}
              >
                DAY {day}
              </span>
            </button>

            {!isLast && (
              <div className="w-10 h-[1.3px] bg-gray-300 mx-3 flex-shrink-0"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
