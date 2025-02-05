import { Response } from "express";
import { prisma } from "../db/client";
import { expenseSchema } from "../utils/validation";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interface";
import { redisClient } from "../db/redis";
import { getOrSetCache } from "../utils/cache";

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

export const addUserIncome = async (req: CustomRequest, res: Response) => {
  const { amount } = req.body;

  const addincome = await prisma.user.update({
    where: { id: req.user!.id },
    data: { totalAmount: { increment: amount } },
  });

  await redisClient.del(`user_details:${req.user?.id}`);
  res.status(200).json(new StandardResponse("Income added", addincome));
};
