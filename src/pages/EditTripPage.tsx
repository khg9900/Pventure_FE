import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import TripCoverUploader from "@/features/trip/components/TripCoverUploader";
import TripForm from "@/features/trip/components/TripForm/TripForm";
import { useState, useEffect } from "react";
import {getTripDetail } from "@/features/trip/api/trip.api";
import type { TripResponseDto } from "@/features/trip/types/trip.dto";

export default function EditTripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [initialTrip, setInitialTrip] = useState<TripResponseDto | null>(null);

  // 서버에서 trip 정보 가져오기
  useEffect(() => {
    if (!tripId) return;

    const fetchTrip = async () => {
      const data = await getTripDetail(Number(tripId)); // API 호출
      setInitialTrip(data);
    };

    fetchTrip();
  }, [tripId]);

  const handleSelectCover = (file: File) => {
    setCoverFile(file);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[var(--color-bg)]">
      <div className="relative w-full">
        <TripCoverUploader 
          defaultImage={initialTrip?.thumbnail || undefined}
          onSelect={handleSelectCover} 
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <TripForm
        coverFile={coverFile}
        editMode={true}
        initialTrip={initialTrip}
      />
    </div>
  );
}
