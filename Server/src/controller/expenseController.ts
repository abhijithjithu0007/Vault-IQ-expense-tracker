import { Response } from "express";
import { prisma } from "../db/client";
import { expenseSchema } from "../utils/validation";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interface";
import { redisClient } from "../db/redis";

const CACHE_KEY = "user_expenses:";
const CACHE_DURATION = 3600;

export const getExpenses = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  const cacheKey = `${CACHE_KEY}${userId}`;

  const expenses = await getOrSetCache(cacheKey, async () => {
    return await prisma.expense.findMany({
      where: { userId },
    });
  });

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
  await redisClient.del(`${CACHE_KEY}${userId}`);

  res.status(201).json(new StandardResponse("Expense added", expense));
};

function getOrSetCache(key: string, cb: () => Promise<any>) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data !== null) {
        console.log("Data from Cache");
        return resolve(data ? JSON.parse(data) : null);
      }
      const freshData = await cb();
      redisClient.setex(key, CACHE_DURATION, JSON.stringify(freshData));
      console.log("Data from DB");

      resolve(freshData);
    });
  });
}
