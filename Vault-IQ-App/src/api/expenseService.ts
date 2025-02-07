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

export const getExpenses = async () => {
  const res = await axiosInstance.get("/expense/get-expenses");
  return res.data;
};

export const addUserIncome = async (amount: number) => {
  const res = await axiosInstance.post("/expense/add-income", { amount });
  return res.data;
};

export const deleteExpense = async (id: number) => {
  const res = await axiosInstance.delete(`/expense/delete-expense/${id}`);
  return res.data;
};

export const updateExpense = async (
  id: number,
  category: string,
  amount: number,
  description: string
) => {
  const res = await axiosInstance.patch(`/expense/update-expense/${id}`, {
    category,
    amount,
    description,
  });
  return res.data;
};

export const getCategories = async () => {
  const res = await axiosInstance.get("/expense/get-category");
  return res.data;
};

export const addCategory = async (name: string) => {
  const res = await axiosInstance.post("/expense/add-category", { name });
  return res.data;
};

export const searchExpenses = async (search: string) => {
  const res = await axiosInstance.get(`/expense/search-expense/${search}`);
  return res.data;
};

export const filterExpenses = async (filterVal: string) => {
  const res = await axiosInstance.get(`/expense/filter-expense/${filterVal}`);
  return res.data;
};
