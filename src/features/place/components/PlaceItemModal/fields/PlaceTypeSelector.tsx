import { PLACE_TYPES, PLACE_TYPE_ICONS, type PlaceType } from "@/features/place/constants";

interface Props {
  value?: PlaceType;
  onChange: (v?: PlaceType) => void;
}

export default function PlaceTypeSelector({ value, onChange }: Props) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
        장소 유형
      </label>
      <div className="grid grid-cols-4 gap-2">
        {PLACE_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`flex items-center justify-center gap-1 px-2 py-1 rounded-xl border transition-colors ${
              value === type
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            <span>{PLACE_TYPE_ICONS[type]}</span>
            <span className="truncate text-xs">{type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
