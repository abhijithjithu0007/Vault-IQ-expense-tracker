import { Request, Response } from "express";
import { prisma } from "../db/client";
import { StandardResponse } from "../utils/standardResponse";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/interface";
import { getOrSetCache } from "../utils/cache";
import crypto from "crypto";
import { transporter } from "../config/nodeMailerConfig";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, currency } = req.body;

  const existUser = await prisma.user.findUnique({ where: { email } });
  if (existUser) {
    res.status(400).json(new StandardResponse("User already exists", null));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      currency,
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

export const getUser = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;

  const cacheKey = `user_details:${userId}`;

  const user = await getOrSetCache(cacheKey, 3600, async () => {
    return await prisma.user.findUnique({ where: { id: userId } });
  });

  res.status(200).json(new StandardResponse("User details", user));
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json(new StandardResponse("User not found", null));
    return;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: {
      token: resetToken,
      userId: user.id,
      expiresAt,
    },
  });

  const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  });
  res.status(200).json(new StandardResponse("Password reset link sent", null));
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!passwordResetToken) {
    res.status(400).json(new StandardResponse("Invalid token", null));
    return;
  }

  if (passwordResetToken.expiresAt < new Date()) {
    res.status(400).json(new StandardResponse("Token expired", null));
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: passwordResetToken.user.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: passwordResetToken.id },
  });

  res
    .status(200)
    .json(new StandardResponse("Password reset successfully", null));
};
