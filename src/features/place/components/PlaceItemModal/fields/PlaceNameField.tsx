// components/PlaceItemModal/fields/PlaceNameField.tsx
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function PlaceNameField({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  const inputVariants = {
    focused: { scale: 1.01, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div variants={inputVariants} animate={focused ? "focused" : "unfocused"}>
      <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
        <Edit3 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
        장소명
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="방문할 장소를 입력하세요"
        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-lg focus:shadow-[var(--color-primary)]/10 transition-all"
      />
    </motion.div>
  );
}
