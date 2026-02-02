import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id?: string;
  username: string;
  email?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;

  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    { name: "auth-storage" }
  )
);
