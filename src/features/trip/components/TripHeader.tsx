import type { TripStatus } from "../types/trip.type";

interface TripHeaderProps {
  title: string;
  period: string;
  status: TripStatus;
  thumbnail?: string;
}

export default function TripHeader({
  title,
  period,
  status,
  thumbnail,
}: TripHeaderProps) {
  const getStatusClass = (s: TripStatus) => {
    switch (s) {
      case "예정":
        return "bg-[var(--status-planned)] text-white";
      case "여행중":
        return "bg-[var(--status-ongoing)] text-white";
      case "완료":
        return "bg-[var(--status-completed)] text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <header className="relative w-full h-56 overflow-hidden shadow-md mb-6 rounded-b-2xl">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={`${title} 썸네일`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
      )}
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-5 left-5 right-5 text-white">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-bold drop-shadow-md">{title}</h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
              status
            )}`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm opacity-90">{period}</p>
      </div>
    </header>
  );
}
