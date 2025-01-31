import express from "express";

import { errorCatch } from "../utils/errors/errorCatch";
import { login, register } from "../controller/userController";
import { validateData } from "../middleware/zodValidation";
import { loginSchema, userSchema } from "../utils/validation";

const router = express.Router();

router.post("/register", validateData(userSchema), errorCatch(register));
router.post("/login", validateData(loginSchema), errorCatch(login));

export default router;
