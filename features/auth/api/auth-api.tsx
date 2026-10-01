// features/auth/api/auth-api.ts
import { publicKy, authKy } from "@/lib/api-client";

export interface UserSignInPayload {
  username: string; // phone number in backend
  password: string;
}

export interface UserSignUpPayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string | null;
  created_at: string;
}

/**
 * Signs in via form-urlencoded data to match OAuth2PasswordRequestForm
 */
export const signIn = async (
  payload: UserSignInPayload,
): Promise<TokenResponse> => {
  const formData = new URLSearchParams();
  formData.append("username", payload.username);
  formData.append("password", payload.password);

  return await publicKy
    .post("auth/sign-in", {
      body: formData,
    })
    .json<TokenResponse>();
};

/**
 * Signs up a new user via JSON payload
 */
export const signUp = async (
  payload: UserSignUpPayload,
): Promise<UserProfile> => {
  return await publicKy
    .post("auth/sign-up", {
      json: payload,
    })
    .json<UserProfile>();
};

/**
 * Fetches current authenticated user profile using authKy
 */
export const getMe = async (): Promise<UserProfile> => {
  return await authKy.get("auth/me").json<UserProfile>();
};
