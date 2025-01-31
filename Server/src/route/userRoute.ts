import express from "express";

import { errorCatch } from "../utils/errors/errorCatch";
import { register } from "../controller/userController";
import { validateData } from "../middleware/zodValidation";
import { userSchema } from "../utils/validation";

const router = express.Router();

router.post("/register", validateData(userSchema), errorCatch(register));

export default router;
