import { useRef, useState, useEffect } from "react";
import { ImagePlus } from "lucide-react";
import defaultCover from "@/assets/sample/trip_thumbnail.jpg";

interface TripCoverUploaderProps {
  defaultImage?: string;
  onSelect?: (file: File, previewUrl: string) => void;
}

export default function TripCoverUploader({
  defaultImage = defaultCover,
  onSelect,
}: TripCoverUploaderProps) {
  const [preview, setPreview] = useState(defaultImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onSelect?.(file, url);
    }
  };

  return (
    <div className="relative w-full h-56 overflow-hidden">
      <img src={preview} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/5" />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/20 border border-white 
                   backdrop-blur-md text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition"
      >
        <ImagePlus className="w-4 h-4" />
        <span>커버 변경</span>
      </button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
