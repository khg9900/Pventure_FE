import { useState } from "react";
import { UsersRound, X } from "lucide-react";
import { useMemberForm } from "../hooks/useMemberForm";

export default function MemberInviteForm() {
  const { invites, addInvite, removeInvite } = useMemberForm();
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (!email.trim()) return;
    addInvite(email.trim());
    setEmail("");
  };

  return (
    <section className="mb-6">
      <h3 className="font-semibold text-[var(--color-text-main)] mb-3 flex items-center gap-2">
        <UsersRound className="text-[var(--color-primary)]" />
        친구 초대
      </h3>

      <div className="flex gap-2 mb-3">
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm 
                     text-[var(--color-text-main)] placeholder-[var(--color-text-sub)]
                     focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-[var(--color-primary)] text-white rounded-lg px-4 py-2 text-sm 
                     hover:opacity-90 transition"
        >
          추가
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {invites.map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-light)] 
                       text-[var(--color-primary)] text-sm rounded-full"
          >
            <span>{m.email}</span>
            <button
              onClick={() => removeInvite(m.email)}
              className="hover:text-red-400 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
