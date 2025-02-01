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
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });
  res
    .status(201)
    .json(new StandardResponse("User registered Successfully", { token }));
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json(new StandardResponse("Invalid credentials", null));
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json(new StandardResponse("Invalid credentials", null));
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });

  res
    .status(200)
    .json(new StandardResponse("User logged in Successfully", { token }));
};
