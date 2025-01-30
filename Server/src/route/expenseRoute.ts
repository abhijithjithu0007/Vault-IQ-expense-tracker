import express from "express";

import { validateData } from "../middleware/zodValidation";
import { errorCatch } from "../utils/errors/errorCatch";
import { expenseSchema } from "../utils/validation";
import { addExpense } from "../controller/expenseController";

const router = express.Router();

router.post(
  "/add-expense",
  validateData(expenseSchema),
  errorCatch(addExpense)
);

export default router;
