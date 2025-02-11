import express from "express";

import { validateData } from "../middleware/zodValidation";
import { errorCatch } from "../utils/errors/errorCatch";
import { budgetSchema } from "../utils/validation";
import { createBudget } from "../controller/budgetController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post(
  "/add-budget",
  verifyToken,
  validateData(budgetSchema),
  errorCatch(createBudget)
);

export default router;
