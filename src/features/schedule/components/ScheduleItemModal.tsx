import { useEffect, useState } from "react";
import { X, MapPin, MessageSquare, Hash, Link2, Edit3 } from "lucide-react";
import type { ScheduleItem } from "../types/schedule";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (item: ScheduleItem) => void;
  initialItem?: ScheduleItem | null;
  slot: ScheduleItem["timeSlot"];
  selectedDay: number;
}

export default function ScheduleItemModal({
  open,
  onClose,
  onSave,
  initialItem,
  slot,
  selectedDay,
}: Props) {
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [hash, setHash] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (initialItem) {
      setPlaceName(initialItem.placeName ?? "");
      setAddress(initialItem.address ?? "");
      setMemo(initialItem.memo ?? "");
      setHash(initialItem.hash ?? "");
      setLink(initialItem.links?.[0] ?? "");
    } else {
      setPlaceName("");
      setAddress("");
      setMemo("");
      setHash("");
      setLink("");
    }
  }, [initialItem, open]);

  if (!open) return null;

  const handleSubmit = () => {
    const newItem: ScheduleItem = {
      id: initialItem?.id ?? Date.now(),
      day: selectedDay,
      timeSlot: slot,
      placeName,
      address,
      memo,
      hash,
      links: link ? [link] : [],
    };
    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md overflow-hidden animate-fadeIn">
        <div className="bg-[var(--color-primary)] text-white py-4 px-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-tight">
            {initialItem ? "일정 수정" : "일정 추가"} —{" "}
            <span className="opacity-90">{slot}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <Edit3 className="w-4 h-4 text-[var(--color-primary)]" />
            <input
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              placeholder="장소명을 입력하세요"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 border-b pb-2">
            <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력하세요"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-start gap-2 border-b pb-2">
            <MessageSquare className="w-4 h-4 mt-1 text-[var(--color-primary)]" />
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요"
              rows={2}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 border-b pb-2">
            <Hash className="w-4 h-4 text-[var(--color-primary)]" />
            <input
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="#해시태그 (쉼표로 구분)"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 border-b pb-2">
            <Link2 className="w-4 h-4 text-[var(--color-primary)]" />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="후기 링크 (선택)"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-gray-50 border-t py-4 px-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
