import { axiosInstance } from "@/utils/axios";

export const addBudgetApi = async (category: string, amount: number) => {
  const res = await axiosInstance.post("/budget/add-budget", {
    category,
    amount,
  });

  return res.data;
};
