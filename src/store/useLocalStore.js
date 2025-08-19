import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLocalStore = create()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "onion-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
