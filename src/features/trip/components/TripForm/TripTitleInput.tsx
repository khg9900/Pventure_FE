import { Bookmark } from "lucide-react";
import SectionField from "@/features/trip/components/TripForm/SectionField";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TripTitleInput({ value, onChange }: Props) {
  return (
    <SectionField icon={<Bookmark />} label="여행 제목">
      <input
        type="text"
        placeholder="여행 제목을 입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3
                   text-[var(--color-text-main)] placeholder-[var(--color-text-sub)]
                   focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
      />
    </SectionField>
  );
}
