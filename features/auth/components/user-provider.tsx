"use client";

import * as React from "react";

import { getMe, type UserProfile } from "@/features/auth/api/auth-api";

type UserState = {
  user: UserProfile | null;
  loading: boolean;
};

const UserContext = React.createContext<UserState | null>(null);

/**
 * Fetches the signed-in user once and shares it with everything below
 * (sidebar footer, profile page, ...), so we don't call /auth/me twice.
 *
 * 401s are handled globally by the authKy afterResponse hook (clears the
 * token and redirects to /login), so a failed request here only needs to
 * stop the loading state.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<UserState>({
    user: null,
    loading: true,
  });

  React.useEffect(() => {
    let active = true;

    getMe()
      .then((user) => {
        if (active) setState({ user, loading: false });
      })
      .catch(() => {
        if (active) setState({ user: null, loading: false });
      });

    return () => {
      active = false;
    };
  }, []);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider.");
  }
  return context;
}

export function getFullName(user: UserProfile | null) {
  if (!user) return "";
  return `${user.first_name} ${user.last_name}`.trim();
}
