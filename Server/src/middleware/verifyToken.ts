import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest, JwtDecoded } from "../types/interface";
import { CustomError } from "../utils/errors/customError";
import { prisma } from "../db/client";
export const verifyToken = async (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const userCookie = req.cookies?.user ? JSON.parse(req.cookies.user) : null;
    console.log(userCookie);

    const token: string = userCookie?.token;

    if (!token) {
      throw new CustomError("You are not authenticated! Please login", 401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = verified as JwtDecoded;

    const userExists = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
