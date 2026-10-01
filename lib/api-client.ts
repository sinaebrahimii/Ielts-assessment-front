import ky from "ky";

import { BASE_URL } from "@/lib/utils";
import { clearAuthToken, getClientToken } from "./token";

const prefixUrl = (BASE_URL || "http://127.0.0.1:8000/").replace(/\/+$/, "");

/**
 * Public client for unauthenticated requests
 */
export const publicKy = ky.create({
  prefix: prefixUrl,
  timeout: 30000,
});

/**
 * Authenticated client for endpoints requiring a Bearer token
 */
export const authKy = ky.create({
  prefix: prefixUrl,
  timeout: 30000,

  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = getClientToken();

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],

    afterResponse: [
      async ({ request, options, response }) => {
        if (response.status === 401) {
          await clearAuthToken();

          if (
            typeof window !== "undefined" &&
            !window.location.pathname.startsWith("/login")
          ) {
            window.location.href = "/login";
          }
        }

        return response;
      },
    ],
  },
});
