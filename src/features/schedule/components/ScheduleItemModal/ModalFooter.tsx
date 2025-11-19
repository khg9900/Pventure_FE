// components/ScheduleItemModal/ModalFooter.tsx
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
}

export default function ModalFooter({ onClose, onSubmit }: Props) {
  return (
    <div className="bg-gradient-to-t from-gray-50 to-white border-t border-gray-200 py-4 px-6 flex gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClose}
        className="flex-1 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm"
      >
        취소
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        className="flex-1 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 hover:shadow-lg hover:shadow-[var(--color-primary)]/30 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
      >
        저장하기
      </motion.button>
    </div>
  );
}
