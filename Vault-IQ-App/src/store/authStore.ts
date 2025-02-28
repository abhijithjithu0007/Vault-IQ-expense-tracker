import { create } from "zustand";
import {
  forgotPasswordApi,
  loginUser,
  registerUser,
  resetPasswordApi,
} from "../api/authService";

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
  forgotPassword: (email: string) => Promise<{ message: string; type: string }>;
  resetPassword: (
    password: string,
    token: string
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
      return { message: err.response.data.message, type: "error" };
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
      return { message: err.response.data.message, type: "error" };
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const data = await forgotPasswordApi(email);
      set({ loading: false });
      return {
        message: data.message,
        type: "success",
      };
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
      return { message: err.response.data.message, type: "error" };
    }
  },
  resetPassword: async (password, token) => {
    set({ loading: true, error: null });
    try {
      const data = await resetPasswordApi(password, token);
      set({ loading: false });
      console.log(data);

      return { message: data.message, type: "success" };
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
      console.log(err);

      return { message: err.response.data.message, type: "error" };
    }
  },
  clearError: () => set({ error: null }),
}));
