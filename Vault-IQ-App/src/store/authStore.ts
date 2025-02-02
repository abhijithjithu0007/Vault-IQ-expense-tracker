import { create } from "zustand";
import { loginUser, registerUser } from "../api/authService";

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
  currency: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    currency: string
  ) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  message: null,
  error: null,
  status: null,
  currency: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser(email, password);
      set({
        user: data.data.token,
        message: data.message,
        status: data.statusCode,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
    }
  },

  register: async (name, email, password, currency) => {
    set({ loading: true, error: null });
    try {
      const data = await registerUser(name, email, password, currency);
      set({
        user: data.data.token,
        message: data.message,
        status: data.statusCode,
        loading: false,
      });
      console.log(data);
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
