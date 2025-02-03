import { Response } from "express";
import { prisma } from "../db/client";
import { expenseSchema } from "../utils/validation";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interface";
import { redisClient } from "../db/redis";

interface Expense {
  id: number;
  userId: number;
  category: string;
  amount: number;
  description: string;
  createdAt: Date;
}

const CACHE_KEY = "user_expenses:";
const CACHE_DURATION = 3600;

export const getExpenses = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  const cacheKey = `${CACHE_KEY}${userId}`;

  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    const expenses = JSON.parse(cachedData) as Expense[];
    res
      .status(200)
      .json(new StandardResponse("Expenses retrieved from cache", expenses));
  }

  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
    },
  });
  await redisClient.setex(cacheKey, CACHE_DURATION, JSON.stringify(expenses));

  res.status(200).json(new StandardResponse("Expenses retrieved", expenses));
};

export const addExpense = async (req: CustomRequest, res: Response) => {
  const parsedData = expenseSchema.parse(req.body);
  const { userId, category, amount, description } = parsedData;
  const expense = await prisma.expense.create({
    data: {
      userId,
      category,
      amount,
      description,
    },
  });

  res.status(201).json(new StandardResponse("Expense added", expense));
};
