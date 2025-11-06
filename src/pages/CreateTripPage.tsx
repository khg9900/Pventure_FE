import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import TripCoverUploader from "@/features/trip/components/TripCoverUploader";
import TripForm from "@/features/trip/components/TripForm";
import { useState } from "react";

export default function CreateTripPage() {
  const navigate = useNavigate();
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleSelectCover = (file: File) => {
    setCoverFile(file);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[var(--color-bg)]">

      <div className="relative w-full">
        <TripCoverUploader onSelect={handleSelectCover} />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <TripForm coverFile={coverFile} />
    </div>
  );
}
