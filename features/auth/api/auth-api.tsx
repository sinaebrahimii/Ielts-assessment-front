import { BASE_URL } from "@/lib/utils";

import axios from "axios";
interface UserSignIn {
  username: string;
  password: string;
}
export const signIn = async (payload: UserSignIn) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", payload.username);
  params.append("password", payload.password);
  params.append("scope", "");

  const response = await axios.post<{
    access_token: string;
    token_type: string;
  }>(`${BASE_URL}auth/sign-in`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};
