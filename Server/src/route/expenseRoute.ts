import express from "express";

import { validateData } from "../middleware/zodValidation";
import { errorCatch } from "../utils/errors/errorCatch";
import { expenseSchema } from "../utils/validation";
import {
  addCategory,
  addExpense,
  addUserIncome,
  deleteExpense,
  filterExpenses,
  getCategory,
  getExpenses,
  searchExpenses,
  updateExpense,
} from "../controller/expenseController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post(
  "/add-expense",
  verifyToken,
  validateData(expenseSchema),
  errorCatch(addExpense)
);

router.get("/get-expenses", verifyToken, errorCatch(getExpenses));
router.post("/add-income", verifyToken, errorCatch(addUserIncome));
router.delete("/delete-expense/:id", verifyToken, errorCatch(deleteExpense));
router.patch("/update-expense/:id", verifyToken, errorCatch(updateExpense));
router.post("/add-category", verifyToken, errorCatch(addCategory));
router.get("/get-category", verifyToken, errorCatch(getCategory));

router.get("/search-expense/:search", verifyToken, errorCatch(searchExpenses));

router.get("/filter-expense", verifyToken, errorCatch(filterExpenses));
export default router;
