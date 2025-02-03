import express from "express";

import { errorCatch } from "../utils/errors/errorCatch";
import { getUser, login, register } from "../controller/userController";
import { validateData } from "../middleware/zodValidation";
import { loginSchema, userSchema } from "../utils/validation";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", validateData(userSchema), errorCatch(register));
router.post("/login", validateData(loginSchema), errorCatch(login));

router.get("/user-profile", verifyToken, errorCatch(getUser));

export default router;
