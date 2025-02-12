import { axiosInstance } from "@/utils/axios";

export const addBudgetApi = async (category: string, amount: number) => {
  const res = await axiosInstance.post("/budget/add-budget", {
    category,
    amount,
  });

  return res.data;
};

export const getBudgetApi = async () => {
  const res = await axiosInstance.get("/budget/get-budget");
  return res.data;
};

export const deleteBudgetApi = async (id: number) => {
  const res = await axiosInstance.delete(`/budget/delete-budget/${id}`);
  return res.data;
};
