import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical,
  UsersRound,
  Calendar,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  Share2,
  Download,
} from "lucide-react";
import type { Trip } from "../types/trip.type";
import sample from "@/assets/sample/trip_thumbnail.jpg";

interface TripCardProps {
  trip: Trip;
  onClick?: () => void;
}

export default function TripCard({ trip, onClick }: TripCardProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const statusClass =
    trip.status === "예정"
      ? "bg-[var(--status-planned)]"
      : trip.status === "여행중"
      ? "bg-[var(--status-ongoing)]"
      : "bg-[var(--status-completed)]";

  return (
    <div
      className="relative bg-[var(--color-bg)] border border-[var(--color-border)] 
                 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 
                 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-40 w-full">
        <img
          src={trip.thumbnail ?? sample}
          alt={trip.title}
          className="w-full h-full object-cover"
        />

        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${statusClass}`}
        >
          {trip.status}
        </span>

        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((v) => !v);
            }}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white transition"
            aria-haspopup="menu"
            aria-expanded={showMenu}
          >
            <MoreVertical className="w-4 h-4 text-[var(--color-text-main)]" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-2 w-32 bg-[var(--color-bg)] border border-[var(--color-border)] 
                         rounded-lg shadow-lg z-30"
              onClick={(e) => e.stopPropagation()}
              ref={menuRef}
              role="menu"
            >
              <MenuItem 
                icon={<Eye />} 
                label="상세 보기" 
                onClick={() => navigate(`/trips/${trip.id}/schedule`)}
              />
              <MenuItem 
                icon={<Pencil />} 
                label="여행 수정" 
                onClick={() => navigate(`/trips/${trip.id}/edit`)}
              />
              <MenuItem icon={<Trash2 />} label="여행 삭제" />
              <hr className="my-1 border-[var(--color-border)]" />
              <MenuItem icon={<Share2 />} label="공유하기" />
              <MenuItem icon={<Download />} label="다운로드" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h4 className="text-lg font-bold text-[var(--color-text-main)]">
          {trip.title}
        </h4>

        <div className="flex items-center text-[var(--color-text-sub)] text-sm">
          <Calendar className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
          <span>
            {trip.startDate?.toLocaleDateString("ko-KR") ?? "날짜 미정"} ~{" "}
            {trip.endDate?.toLocaleDateString("ko-KR") ?? "날짜 미정"}
          </span>
        </div>

        <div className="flex items-center text-[var(--color-text-sub)] text-sm">
          <MapPin className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
          <span>{trip.destinations.join(" → ")}</span>
        </div>

        <div className="flex items-center text-[var(--color-text-sub)] text-sm mt-2">
          <UsersRound className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
          <span>{trip.participants ?? 1}명</span>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick || (() => alert(`${label} 클릭`))}
      className="w-full flex items-center px-3 py-2 text-sm hover:bg-[var(--color-surface)] 
                 text-[var(--color-text-main)] transition-colors"
      role="menuitem"
    >
      <span className="w-4 h-4 mr-2 flex items-center justify-center">
        {icon}
      </span>
      <span className="text-[13px]">{label}</span>
    </button>
  );
}
