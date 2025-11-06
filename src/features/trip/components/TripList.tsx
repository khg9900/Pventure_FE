import { Calendar } from "lucide-react";
import type { Trip } from "../types/trip.type";
import TripCard from "./TripCard";

interface TripListProps {
  trips: Trip[];
  title?: string;
  emptyText?: string;
  onItemClick?: (trip: Trip) => void;
  className?: string;
}

export default function TripList({
  trips,
  emptyText = "여행이 없습니다",
  onItemClick,
  className = "",
}: TripListProps) {
  return (
    <div
      className={`p-3 ${className}`}
    >
      {trips.length > 0 ? (
        <div className="space-y-3">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onClick={() => onItemClick?.(trip)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-[var(--color-text-sub)]">
          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p>{emptyText}</p>
        </div>
      )}
    </div>
  );
}
