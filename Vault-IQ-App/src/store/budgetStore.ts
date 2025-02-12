import { addBudgetApi, deleteBudgetApi } from "@/api/budgetService";
import { create } from "zustand";

interface Budget {
  addBudgetError: string | null;
  deleteBudgetError: string | null;

  addBudgetLoad: boolean;
  deleteBudgetLoad: boolean;

  addBudget: (
    category: string,
    amount: number
  ) => Promise<{ message: string; type: string }>;
  deleteBudget: (id: number) => Promise<{ message: string; type: string }>;
  clearError: () => void;
}

export const useBudgetStore = create<Budget>((set) => ({
  addBudgetError: null,
  deleteBudgetError: null,

  addBudgetLoad: false,
  deleteBudgetLoad: false,

  addBudget: async (category, amount) => {
    set({
      addBudgetLoad: true,
      addBudgetError: null,
    });
    try {
      const data = await addBudgetApi(category, amount);
      set({
        addBudgetLoad: false,
      });
      return { message: data.message, type: "success" };
    } catch (err: any) {
      set({
        addBudgetError: err.message || "Something went wrong",
        addBudgetLoad: false,
      });
      return { message: err.message, type: "error" };
    }
  },
  deleteBudget: async (id) => {
    set({ deleteBudgetLoad: true });
    try {
      const data = await deleteBudgetApi(id);
      set({ deleteBudgetLoad: false });
      return { message: data.message, type: "success" };
    } catch (err: any) {
      return { message: err.message, type: "error" };
    }
  },
  clearError: () => set({ addBudgetError: null }),
}));
