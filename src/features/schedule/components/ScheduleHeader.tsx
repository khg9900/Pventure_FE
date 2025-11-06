import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ScheduleHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-5 py-4 text-white">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full bg-white/30 hover:bg-white transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded-full bg-white/30 hover:bg-white transition"
        >
          <MoreVertical className="w-5 h-5 text-gray-700" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-md text-gray-700 text-sm z-50">
            <button
              onClick={() => navigate("/trips/edit")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              여행 수정
            </button>

            <button
              onClick={() =>
                navigator.share?.({ title: "내 여행 공유하기", text: "나의 여행 일정을 확인해보세요!" })
              }
              className="block w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              공유하기
            </button>

            <button
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  alert("🗑️ 여행이 삭제되었습니다.");
                }
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
            >
              여행 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
