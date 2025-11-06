// src/features/auth/hooks/useAuth.ts
import { redirectToOAuth } from "../api/auth.api";
import type { OAuthProvider } from "../types/auth.type";

export function useAuth() {
  const loginWithProvider = (provider: OAuthProvider) => {
    redirectToOAuth(provider);
  };

  return { loginWithProvider };
}