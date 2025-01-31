import express from "express";

import { validateData } from "../middleware/zodValidation";
import { errorCatch } from "../utils/errors/errorCatch";
import { expenseSchema } from "../utils/validation";
import { addExpense } from "../controller/expenseController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post(
  "/add-expense",
  verifyToken,
  validateData(expenseSchema),
  errorCatch(addExpense)
);

export default router;
