import { Request, Response } from "express";
import { prisma } from "../db/client";
import { StandardResponse } from "../utils/standardResponse";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existUser = await prisma.user.findUnique({ where: { email } });
  if (existUser) {
    res.status(400).json(new StandardResponse("User already exists", null));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });
  res
    .status(201)
    .json(
      new StandardResponse("User registered Successfully", {
        user: user,
        token: token,
      })
    );
};
