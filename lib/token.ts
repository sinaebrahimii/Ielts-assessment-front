// lib/token.ts
import { removeToken, storeToken } from "@/features/auth/action/auth-actions";

const TOKEN_KEY = "auth_token";

export function getClientToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export async function setAuthToken(token: string): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
  // Sync with Next.js cookie store for Server Components / Server Actions
  await storeToken(token);
}

export async function clearAuthToken(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
  await removeToken();
}
