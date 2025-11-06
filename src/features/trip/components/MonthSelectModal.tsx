import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectModalProps {
  onClose: () => void;
  onSelect: (date: Date) => void;
}

export default function MonthSelectModal({ onClose, onSelect }: MonthSelectModalProps) {
  const [year, setYear] = useState(new Date().getFullYear());
  const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg)] rounded-2xl shadow-lg w-[90%] max-w-sm p-6 animate-fadeIn border border-[var(--color-border)]">

        <div className="flex justify-between items-center mb-5">
          <button
            onClick={() => setYear((y) => y - 1)}
            className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-primary)]" />
          </button>

          <h2 className="text-lg font-semibold text-[var(--color-primary)] tracking-wide">
            {year}년
          </h2>

          <button
            onClick={() => setYear((y) => y + 1)}
            className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)]" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {months.map((label, idx) => (
            <button
              key={label}
              onClick={() => {
                onSelect(new Date(year, idx, 1));
                onClose();
              }}
              className="py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] 
                         text-[var(--color-text-main)] font-medium hover:bg-[var(--color-primary-light)] 
                         hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] 
                         transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[var(--color-text-sub)] hover:bg-[var(--color-surface)] rounded-lg transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
