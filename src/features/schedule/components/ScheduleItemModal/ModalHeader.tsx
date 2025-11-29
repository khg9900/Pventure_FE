// components/ScheduleItemModal/ModalHeader.tsx
import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { ScheduleResponseDto } from "@/features/schedule/types/schedule";

interface Props {
  Schedule?: ScheduleResponseDto | null;
  slot: ScheduleResponseDto["timeSlot"];
  selectedDay: number;
  onClose: () => void;
}

export default function ModalHeader({ slot, selectedDay, onClose }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-600 text-white py-2 px-4 overflow-hidden shadow-md">
      {/* Soft highlights */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white,transparent)]"></div>
      <div className="absolute -top-16 -right-20 w-52 h-52 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -left-20 w-48 h-48 bg-red-400/20 rounded-full blur-3xl"></div>

      <div className="relative flex items-center justify-between">
        {/* Left side info */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex items-center gap-2"
        >
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full border border-white/20 bg-white/10 backdrop-blur-lg">
            {slot}
          </span>

          <span className="text-white/40">•</span>

          <span className="text-sm font-medium tracking-wide text-white/95">
            Day {selectedDay}
          </span>
        </motion.div>

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
