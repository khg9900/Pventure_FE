import { Plus, Pencil, MapPinPen, Save } from "lucide-react";

type FloatingIconType = "plus" | "pencil" | "mappinpen" | "save";

interface FloatingButtonProps {
  iconType?: FloatingIconType;
  onClick: () => void;
}

export default function FloatingButton({
  iconType = "plus",
  onClick,
}: FloatingButtonProps) {
  const iconMap = { plus: Plus, pencil: Pencil, mappinpen: MapPinPen, save: Save };
  const Icon = iconMap[iconType] ?? Plus;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-[calc(50%-240px+24px)] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 text-white z-50 bg-[var(--color-primary)] hover:bg-[var(--color-accent)]"
      style={{
        backdropFilter: "blur(4px)",
      }}
    >
      <Icon className="w-7 h-7" />
    </button>
  );
}
