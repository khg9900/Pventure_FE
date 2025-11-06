export type OAuthProvider = "google" | "kakao" | "naver";

export interface OAuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    profileImage?: string;
  };
}
