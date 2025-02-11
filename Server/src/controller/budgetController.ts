import { Response } from "express";
import { prisma } from "../db/client";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interface";

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
