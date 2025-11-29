// components/ScheduleItemModal/fields/MemoField.tsx
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function MemoField({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  const inputVariants = {
    focused: { scale: 1.01, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div variants={inputVariants} animate={focused ? "focused" : "unfocused"}>
      <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
        <MessageSquare className="w-3.5 h-3.5 text-[var(--color-primary)]" />
        메모
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="일정에 대한 메모를 작성하세요 (준비물, 주의사항 등)"
          rows={3}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-[var(--color-primary)] focus:shadow-lg focus:shadow-[var(--color-primary)]/10 transition-all"
        />
        {value && (
          <span className="absolute bottom-2 right-3 text-xs text-gray-400">
            {value.length}자
          </span>
        )}
      </div>
    </motion.div>
  );
}
