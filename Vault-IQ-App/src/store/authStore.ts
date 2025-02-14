import { create } from "zustand";
import { loginUser, registerUser } from "../api/authService";

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
  status: number | null;
  currency: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ message: string; type: string }>;
  register: (
    name: string,
    email: string,
    password: string,
    currency: string
  ) => Promise<{ message: string; type: string }>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  status: null,
  currency: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser(email, password);
      set({
        user: data.data.token,
        status: data.statusCode,
        loading: false,
      });
      return { message: data.message, type: "success" };
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
      return { message: err.message, type: "error" };
    }
  },

  register: async (name, email, password, currency) => {
    set({ loading: true, error: null });
    try {
      const data = await registerUser(name, email, password, currency);
      set({
        user: data.data.token,
        status: data.statusCode,
        loading: false,
      });
      return { message: data.message, type: "success" };
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
      return { message: err.message, type: "error" };
    }
  },

  clearError: () => set({ error: null }),
}));
