import { useState } from "react";
import {
  MapPin,
  MessageSquare,
  GripVertical,
  Trash2,
} from "lucide-react";
import type { ScheduleItem } from "../types/schedule";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";

import sample from "@/assets/sample/instagram.png";

interface ScheduleItemCardProps {
  item: ScheduleItem;
  isEditMode?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  onDelete?: (id: number) => void;
  onClick?: (item: ScheduleItem) => void;
}

const getLinkIcon = (url: string) => {
  if (url.includes("instagram.com")) return sample;
  if (url.includes("naver.com") || url.includes("blog")) return sample;
  if (url.includes("maps.google.com")) return sample;
  if (url.includes("youtube.com")) return sample;
  return sample;
};

export default function ScheduleItemCard({
  item,
  isEditMode = false,
  dragHandleProps,
  onDelete,
  onClick,
}: ScheduleItemCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    if (!isEditMode) setIsChecked((prev) => !prev);
  };

  return (
    <motion.div
      layout
      className="bg-white p-3 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
      onClick={() => {
        if (isEditMode && onClick) onClick(item);
      }}
    >
      <div className="flex items-center justify-between cursor-pointer select-none mb-2">
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <div
              {...dragHandleProps}
              className="flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="text-gray-400 w-4 h-4" />
            </div>
          ) : (
            <div
              className="w-2 h-2 rounded-full bg-[var(--color-primary-border)]"
              onClick={toggleCheck}
            ></div>
          )}

          <span
            className={`text-gray-800 font-medium transition-all ${
              isChecked ? "line-through text-gray-400" : ""
            }`}
          >
            {item.placeName}
          </span>
        </div>

        {!isEditMode ? (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={toggleCheck}
            className="appearance-none w-4 h-4 rounded border border-gray-400
              checked:bg-[var(--color-primary-border)] checked:border-[var(--color-primary-border)]
              flex items-center justify-center relative
              after:content-['✓'] after:text-white after:text-[10px] after:absolute"
          />
        ) : (
          onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="text-gray-400 hover:text-red-500 transition ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )
        )}
      </div>

      <AnimatePresence initial={false}>
        {(!isChecked || isEditMode) && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border border-[var(--color-primary-border)] rounded-xl ml-5 mt-2 p-3 bg-white">
              {item.address && (
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                  <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                  {item.address}
                </p>
              )}

              {item.memo && (
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                  <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
                  {item.memo}
                </p>
              )}

              {item.links?.length ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-medium hover:bg-[var(--color-primary-soft)] transition-colors"
                    >
                      <img
                        src={getLinkIcon(link)}
                        alt="link-icon"
                        className="w-4 h-4"
                      />
                      후기 {idx + 1}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
