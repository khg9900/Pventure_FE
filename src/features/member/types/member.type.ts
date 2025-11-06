export interface Member {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "editor" | "viewer";
}

export interface MemberInvite {
  email: string;
}
