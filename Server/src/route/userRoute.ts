import express from "express";

import { errorCatch } from "../utils/errors/errorCatch";
import {
  forgotPassword,
  getUser,
  login,
  register,
  resetPassword,
} from "../controller/userController";
import { validateData } from "../middleware/zodValidation";
import { loginSchema, userSchema } from "../utils/validation";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", validateData(userSchema), errorCatch(register));
router.post("/login", validateData(loginSchema), errorCatch(login));

router.get("/user-profile", verifyToken, errorCatch(getUser));

router.post("/forgot-password", errorCatch(forgotPassword));

router.post("/reset-password", errorCatch(resetPassword));

export default router;
