import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { useFolders } from "../hooks/useFolders";
import FolderModal from "./FolderModal";

export default function FolderSelect({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (folderName: string) => void;
}) {
  const { folders, addFolder } = useFolders();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3 bg-[var(--color-bg)] 
                   flex justify-between items-center hover:bg-[var(--color-surface)] transition"
      >
        <span className="text-[var(--color-text-main)] font-medium">{selected}</span>
        <ChevronDown
          size={18}
          className={`text-[var(--color-text-sub)] transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-[var(--color-bg)] border border-[var(--color-border)] 
                        rounded-lg shadow-md overflow-hidden animate-fadeIn">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-5px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {folders.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                onChange(f.name);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-primary-light)] 
                         transition-colors ${
                           selected === f.name
                             ? "text-[var(--color-primary)] font-medium"
                             : "text-[var(--color-text-main)]"
                         }`}
            >
              {f.name}
            </button>
          ))}

          <div className="border-t border-[var(--color-border)] my-1"></div>

          <button
            onClick={() => {
              setShowModal(true);
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 
                       text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition"
          >
            <Plus size={16} />
            새 폴더 만들기
          </button>
        </div>
      )}

      {showModal && (
        <FolderModal
          onClose={() => setShowModal(false)}
          onCreate={(name) => {
            addFolder(name);
            onChange(name);
          }}
        />
      )}
    </div>
  );
}
