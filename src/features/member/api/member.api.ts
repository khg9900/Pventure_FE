import type { MemberInvite, Member } from "../types/member.type";
import { MOCK_MEMBERS } from "../mock/members.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
// const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const inviteMembers = async (
  tripId: number,
  invites: MemberInvite[]
): Promise<Member[]> => {
  if (USE_MOCK) {
    console.log(`📤 [Mock] 여행(${tripId}) 초대 요청`, invites);
    // mock에서는 단순히 기존 멤버 + 초대한 이메일을 임시로 반환
    const newMembers = invites.map((i, idx) => ({
      id: MOCK_MEMBERS.length + idx + 1,
      name: i.email.split("@")[0],
      email: i.email,
      role: "viewer" as const,
    }));
    return [...MOCK_MEMBERS, ...newMembers];
  }

  // 실제 연동 시 axios로 교체
  // const res = await axios.post(`${API_BASE}/api/trips/${tripId}/members`, invites);
  // return res.data;
  throw new Error("inviteMembers: API not implemented");
};

export const getMembers = async (tripId: number): Promise<Member[]> => {
  if (USE_MOCK) {
    console.log(`📄 [Mock] 여행(${tripId}) 멤버 조회`);
    return MOCK_MEMBERS;
  }

  // 실제 연동 예시
  // const res = await axios.get(`${API_BASE}/api/trips/${tripId}/members`);
  // return res.data;
  throw new Error("getMembers: API not implemented");
};
