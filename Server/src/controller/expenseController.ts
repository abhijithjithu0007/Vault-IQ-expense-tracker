import { Response } from "express";
import { prisma } from "../db/client";
import { expenseSchema } from "../utils/validation";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interface";
import { redisClient } from "../db/redis";
import { getOrSetCache } from "../utils/cache";

export const addUserIncome = async (req: CustomRequest, res: Response) => {
  const { amount } = req.body;

  const addincome = await prisma.user.update({
    where: { id: req.user!.id },
    data: { totalAmount: { increment: amount } },
  });

  await redisClient.del(`user_details:${req.user?.id}`);
  res.status(200).json(new StandardResponse("Income added", addincome));
};
export const getExpenses = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  const cacheKey = `user_expenses:${userId}`;

  const expenses = await getOrSetCache(cacheKey, 3600, async () => {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  });

  res.status(200).json(new StandardResponse("Expenses retrieved", expenses));
};

export const addExpense = async (req: CustomRequest, res: Response) => {
  const parsedData = expenseSchema.parse(req.body);
  const { category, amount, description } = parsedData;
  const expense = await prisma.expense.create({
    data: {
      userId: req.user!.id,
      category,
      amount,
      description,
    },
  });

  await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      currentExpense: {
        increment: amount,
      },
    },
  });

  await redisClient.del(`user_expenses:${req.user?.id}`);
  await redisClient.del(`user_details:${req.user?.id}`);

  res.status(201).json(new StandardResponse("Expense added", expense));
};

export const deleteExpense = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const deletedExpense = await prisma.expense.delete({
    where: { id: Number(id) },
  });

  await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      currentExpense: {
        decrement: deletedExpense.amount,
      },
    },
  });

  await redisClient.del(`user_expenses:${req.user?.id}`);
  await redisClient.del(`user_details:${req.user?.id}`);
  res.status(200).json(new StandardResponse("Expense deleted", deletedExpense));
};

export const updateExpense = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { category, amount, description } = req.body;

  const oldExpense = await prisma.expense.findUnique({
    where: { id: Number(id) },
    select: { amount: true },
  });

  const difference = amount - (oldExpense?.amount ?? 0);
  const updatedExpense = await prisma.expense.update({
    where: { id: Number(id) },
    data: { category, amount, description },
  });

  await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      currentExpense: { increment: difference },
    },
  });
  await redisClient.del(`user_expenses:${req.user?.id}`);
  await redisClient.del(`user_details:${req.user?.id}`);

  res.status(200).json(new StandardResponse("Expense updated", updatedExpense));
};

export const addCategory = async (req: CustomRequest, res: Response) => {
  const { name } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json(new StandardResponse("Unauthorized", null));
    return;
  }
  const category = await prisma.category.create({
    data: {
      name: name,
      userId: userId,
    },
  });
  res.status(201).json(new StandardResponse("Category added", category));
};

export const getCategory = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json(new StandardResponse("Unauthorized", null));
    return;
  }
  const categories = await prisma.category.findMany({
    where: { userId: userId },
  });
  const defaultCategories = [
    "Car",
    "Bus",
    "Groceries",
    "Food",
    "Gas",
    "Housing",
    "Medical",
    "Personal",
  ];
  res
    .status(200)
    .json(
      new StandardResponse("Categories retrieved", {
        categories,
        defaultCategories,
      })
    );
};
