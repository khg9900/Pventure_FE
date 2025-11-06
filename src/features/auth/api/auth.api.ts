import { OAUTH_PROVIDER_URLS } from "../constants";
import type { OAuthProvider } from "../types/auth.type";

export const redirectToOAuth = (provider: OAuthProvider) => {
  const url = OAUTH_PROVIDER_URLS[provider];
  if (!url) throw new Error("지원되지 않는 로그인 방식입니다.");

  window.location.href = url;
};

export const fetchUserProfile = async (token: string) => {
  const res = await fetch(`/api/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("사용자 정보 요청 실패");
  return res.json();
};
