import { axiosInstance } from "@/utils/axios";

export const addExpense = async (
  category: string,
  amount: number,
  bill: string,
  description: string
) => {
  const res = await axiosInstance.post("/expense/add-expense", {
    category,
    amount,
    bill,
    description,
  });

  return res.data;
};
