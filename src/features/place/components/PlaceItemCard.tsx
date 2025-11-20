// PlaceItemCard.tsx
import { MapPin, MessageSquare} from "lucide-react";
import type { PlaceResponseDto } from "@/features/place/types/place";

interface PlaceItemCardProps {
  place: PlaceResponseDto;
  memo?: string;
}

import instagram from "@/assets/sample/instagram.png";
import naver from "@/assets/sample/naver.png";

const getLinkIcon = (url: string) => {
  if (url.includes("instagram.com")) return instagram;
  if (url.includes("naver.com") || url.includes("blog")) return naver;
  if (url.includes("maps.google.com")) return instagram;
  if (url.includes("youtube.com")) return instagram;
  return instagram;
};

export default function PlaceItemCard({ place, memo }: PlaceItemCardProps) {
  return (
    <div className="space-y-2 bg-white p-2 rounded-xl border border-white">

      {/* 주소 */}
      {place.address && (
        <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
          <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
          {place.address}
        </p>
      )}

      {/* 메모 */}
      {memo && (
        <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
          <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
          {memo}
        </div>
      )}

      {/* 링크들 */}
      {place.links?.length ? (
        <div className="flex flex-wrap gap-3 mt-3">
          {place.links.map((link, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-medium hover:bg-[var(--color-primary-soft)] transition-colors"
            >
              <img
                src={getLinkIcon(link)}
                alt="link-icon"
                className="w-4 h-4"
              />
              후기 {idx + 1}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
