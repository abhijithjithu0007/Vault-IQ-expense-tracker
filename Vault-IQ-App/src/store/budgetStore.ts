import { addBudgetApi } from "@/api/budgetService";
import { create } from "zustand";

interface Budget {
  error: {
    addBudgetError: string | null;
  };
  loading: {
    addBudgetLoad: boolean;
  };
  addBudget: (
    category: string,
    amount: number
  ) => Promise<{ message: string; type: string }>;
  clearError: () => void;
}

export const useBudgetStore = create<Budget>((set) => ({
  error: {
    addBudgetError: null,
  },
  loading: {
    addBudgetLoad: false,
  },
  addBudget: async (category, amount) => {
    set({
      loading: { addBudgetLoad: true },
      error: { addBudgetError: null },
    });
    try {
      const data = await addBudgetApi(category, amount);
      set({
        loading: { addBudgetLoad: false },
      });
      return { message: data.message, type: "success" };
    } catch (err: any) {
      set({
        error: { addBudgetError: err.message || "Something went wrong" },
        loading: { addBudgetLoad: false },
      });
      return { message: err.message, type: "error" };
    }
  },
  clearError: () => set({ error: { addBudgetError: null } }),
}));
