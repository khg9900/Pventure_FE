import { MapPin } from "lucide-react";
import SectionField from "@/features/trip/components/TripForm/SectionField";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TripRegionInput({ value, onChange }: Props) {
  return (
    <SectionField icon={<MapPin />} label="여행 지역">
      <input
        type="text"
        placeholder="예: 도쿄, 제주"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3
                   text-[var(--color-text-main)] placeholder-[var(--color-text-sub)]
                   focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
      />
    </SectionField>
  );
}
