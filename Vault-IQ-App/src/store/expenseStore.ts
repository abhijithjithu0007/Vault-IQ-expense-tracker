import { addExpense, addUserIncome, deleteExpense } from "@/api/expenseService";
import { create } from "zustand";

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
  error: {
    addExpenseError: string | null;
  };
  loading: {
    addExpenseLoad: boolean;
  };
  addExpense: (
    category: string,
    amount: number,
    bill: string,
    description: string
  ) => Promise<{ message: string; type: string }>;
  addIncome: (amount: number) => Promise<{ message: string; type: string }>;
  deleteExpense: (id: number) => Promise<{ message: string; type: string }>;
  clearError: () => void;
}

export const useExpenseStore = create<Expense>((set) => ({
  id: 0,
  category: "",
  amount: 0,
  description: "",
  error: {
    addExpenseError: null,
  },
  loading: {
    addExpenseLoad: false,
  },
  addExpense: async (category, amount, bill, description) => {
    set({
      loading: { addExpenseLoad: true },
      error: { addExpenseError: null },
    });
    try {
      const data = await addExpense(category, amount, bill, description);
      set({
        id: data.data.id,
        category: data.data.category,
        amount: data.data.amount,
        description: data.data.description,
        loading: { addExpenseLoad: false },
      });
      return { message: data.message, type: "success" };
    } catch (err: any) {
      set({
        error: { addExpenseError: err.message || "Something went wrong" },
        loading: { addExpenseLoad: false },
      });
      return { message: err.message, type: "error" };
    }
  },
  addIncome: async (amount) => {
    try {
      const data = await addUserIncome(amount);
      return { message: data.message, type: "success" };
    } catch (err: any) {
      return { message: err.message, type: "error" };
    }
  },
  deleteExpense: async (id) => {
    try {
      const data = await deleteExpense(id);
      return { message: data.message, type: "success" };
    } catch (err: any) {
      return { message: err.message, type: "error" };
    }
  },
  clearError: () => set({ error: { addExpenseError: null } }),
}));
