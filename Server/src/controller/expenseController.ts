import { Request, Response } from "express";
import { prisma } from "../db/client";
import { expenseSchema } from "../utils/validation";
import { StandardResponse } from "../utils/standardResponse";

export const addExpense = async (req: Request, res: Response) => {
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
