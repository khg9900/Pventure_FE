import { Folder, Plus } from "lucide-react";
import { useFolders } from "../hooks/useFolders";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FolderModal from "./FolderModal";

export default function FolderList() {
  const { folders, loading, addFolder } = useFolders();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (loading)
    return (
      <p className="text-center text-[var(--color-text-sub)] mt-10">
        불러오는 중...
      </p>
    );

  return (
    <div className="p-6 bg-[var(--color-bg)] min-h-[100dvh]">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--color-text-main)]">
          나의 여행
        </h2>
        <p className="text-sm text-[var(--color-text-sub)] mt-1">
          폴더별로 여행을 정리해보세요
        </p>
      </div>

      <div className="flex flex-col divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-xl overflow-hidden bg-white">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => navigate(`/folders/${folder.id}`)}
            className="flex justify-between items-center px-5 py-4 text-left 
                       hover:bg-[var(--color-surface)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="text-base text-[var(--color-text-main)] font-medium">
                {folder.name}
              </span>
            </div>
            <span className="text-sm text-[var(--color-text-sub)]">
              {folder.tripCount}
            </span>
          </button>
        ))}

        {folders.length === 0 && (
          <p className="text-center text-[var(--color-text-sub)] py-10">
            아직 생성된 폴더가 없습니다.
          </p>
        )}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3 mt-6 px-5 py-3 w-full 
                   border border-[var(--color-border)] rounded-xl 
                   text-[var(--color-text-sub)] hover:bg-[var(--color-surface)] 
                   transition-colors"
      >
        <Plus className="w-5 h-5 text-[var(--color-text-sub)]" />
        <span className="text-sm font-medium">새 폴더</span>
      </button>

      {showModal && (
        <FolderModal
          onClose={() => setShowModal(false)}
          onCreate={(name) => {
            addFolder(name);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
