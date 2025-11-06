import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function FolderModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg)] w-80 rounded-xl shadow-lg p-6 relative animate-fadeIn border border-[var(--color-border)]">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--color-text-sub)] hover:text-[var(--color-text-main)] transition-colors"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-3">
          새 폴더 만들기
        </h3>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="폴더 이름을 입력하세요"
          className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 mb-4 
                     focus:ring-2 focus:ring-[var(--color-primary)] outline-none 
                     text-[var(--color-text-main)] placeholder-[var(--color-text-sub)]"
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[var(--color-border)] 
                       text-[var(--color-text-sub)] hover:bg-[var(--color-surface)] transition"
          >
            취소
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition"
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
