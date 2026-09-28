import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UseAuthStore {
  email: string;
  username: string;
  token: string;
  objectId: string;
  setAuth: (
    email: string,
    username: string,
    token: string,
    objectId: string,
  ) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<UseAuthStore>()(
  persist(
    (set) => ({
      username: '',
      email: '',
      token: '',
      objectId: '',

      setAuth: (email, username, token, objectId) =>
        set({
          email,
          username,
          token,
          objectId,
        }),

      clearAuth: () =>
        set({
          email: '',
          username: '',
          token: '',
          objectId: '',
        }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        objectId: state.objectId,
      }),
    },
  ),
);
