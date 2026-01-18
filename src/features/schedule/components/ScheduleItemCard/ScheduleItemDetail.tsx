import { motion } from "framer-motion";
import PlaceItemCard from "@/features/place/components/PlaceItemCard";
import type { PlaceResponseDto } from "@/features/place/types/place";

interface Props {
  place: PlaceResponseDto | null;
  memo?: string | null;
}

export default function ScheduleItemDetail({ place, memo }: Props) {
  const hasPlace = !!place;
  const hasMemo = memo && memo.trim() !== "";

  if (!hasPlace && !hasMemo) return null;

  return (
    <motion.div
      key="details"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <div className="border border-[var(--color-primary-border)] rounded-xl ml-5 mt-2 p-3 bg-white box-border flex flex-col gap-3">

        {hasPlace && <PlaceItemCard place={place!} memo={undefined} />}

        {hasMemo && (
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {memo}
          </p>
        )}

      </div>
    </motion.div>
  );
}
