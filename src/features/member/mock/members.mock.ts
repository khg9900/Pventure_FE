import type { Member } from "../types/member.type";
import avatar from "@/assets/brand/pventure_logo.png";

export const MOCK_MEMBERS: Member[] = [
  {
    id: 1,
    name: "하경",
    email: "hakyung@example.com",
    avatar,
    role: "owner",
  },
  {
    id: 2,
    name: "경수",
    email: "kyungsoo@example.com",
    avatar,
    role: "editor",
  },
  {
    id: 3,
    name: "서하",
    email: "seoha@example.com",
    avatar,
    role: "viewer",
  },
];
