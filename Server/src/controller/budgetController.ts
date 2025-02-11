import { Response } from "express";
import { prisma } from "../db/client";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interface";
import { getOrSetCache } from "../utils/cache";

export const createBudget = async (req: CustomRequest, res: Response) => {
  const { category, amount } = req.body;

  const user = req.user?.id;
  const budget = await prisma.budget.findFirst({
    where: { userId: user, category: category },
  });

  if (budget) {
    budget.amount = amount;
  } else {
    await prisma.budget.create({
      data: {
        userId: req.user!.id,
        amount,
        category,
      },
    });
  }

  res.status(200).json(new StandardResponse("Budget created"));
};

export const getBudget = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;

  const cacheKey = `user_budget:${userId}`;

  const budget = await getOrSetCache(cacheKey, 3600, async () => {
    return await prisma.budget.findMany({
      where: { userId: userId },
    });
  });

  res.status(200).json(new StandardResponse("Budget retrieved", budget));
};

export const deleteBudget = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const deletedBudget = await prisma.budget.delete({
    where: { id: Number(id) },
  });

  res.status(200).json(new StandardResponse("Budget deleted", deletedBudget));
};
