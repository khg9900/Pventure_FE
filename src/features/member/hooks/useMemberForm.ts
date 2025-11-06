import { useState } from "react";
import type { MemberInvite } from "../types/member.type";

export function useMemberForm() {
  const [invites, setInvites] = useState<MemberInvite[]>([]);

  const addInvite = (email: string) => {
    if (!email.trim()) return;
    if (invites.some((i) => i.email === email)) return;
    setInvites([...invites, { email }]);
  };

  const removeInvite = (email: string) => {
    setInvites(invites.filter((i) => i.email !== email));
  };

  return { invites, addInvite, removeInvite };
}
