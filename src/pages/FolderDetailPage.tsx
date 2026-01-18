import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTrips } from "@/features/trip/hooks/useTrips";
import TripList from "@/features/trip/components/TripList";
import { useFolders } from "@/features/folder/hooks/useFolders";

export default function FolderDetailPage() {
  const { id } = useParams();
  const folderId = Number(id);
  const navigate = useNavigate();

  const { trips, loading } = useTrips();
  const { getFolderById } = useFolders();
  const folder = getFolderById(folderId);

  const filteredTrips =
    folderId === 0 ? trips : trips.filter((t) => t.folderId === folderId);

  return (
    <div className="p-6 bg-[var(--color-bg)] min-h-[100dvh]">

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-[var(--color-surface)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--color-text-main)]" />
        </button>
        <h2 className="text-xl font-bold text-[var(--color-text-main)]">
          {folder?.name ?? "여행 폴더"}
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-[var(--color-text-sub)]">
          불러오는 중...
        </p>
      ) : (
        <TripList
          title={`${folder?.name ?? "폴더"}의 여행`}
          trips={filteredTrips}
          emptyText="이 폴더에는 여행이 없습니다"
          onItemClick={(trip) => navigate(`/trips/${trip.id}/schedule`)}
        />
      )}
    </div>
  );
}
