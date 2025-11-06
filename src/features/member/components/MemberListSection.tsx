import { UserPlus2 } from "lucide-react";
import type { Member } from "../types/member.type";

interface MemberListSectionProps {
  members: Member[];
  onAddMember?: () => void;
}

export default function MemberListSection({
  members,
  onAddMember,
}: MemberListSectionProps) {
  const visibleMembers = members.slice(0, 2);
  const extraCount = members.length - visibleMembers.length;

  return (
    <div className="flex items-center justify-between bg-[var(--color-surface)] 
                    rounded-xl shadow-sm px-4 py-3 mb-6 border border-[var(--color-border)]">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {visibleMembers.map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              className="w-9 h-9 rounded-full border-2 border-[var(--color-bg)] object-cover"
            />
          ))}
          {extraCount > 0 && (
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] 
                            border-2 border-[var(--color-bg)] flex items-center 
                            justify-center text-xs text-[var(--color-primary)] font-medium">
              +{extraCount}
            </div>
          )}
        </div>

        <p className="text-sm text-[var(--color-text-main)] font-medium">
          {members.length}명의 친구와 여행 중 ✈️
        </p>
      </div>

      <button
        onClick={onAddMember}
        className="flex items-center gap-1 bg-[var(--color-primary)] text-white text-sm 
                   px-3 py-3 rounded-full shadow-sm hover:bg-[var(--color-primary-dark)] 
                   transition-colors"
      >
        <UserPlus2 className="w-4 h-4" />
      </button>
    </div>
  );
}
