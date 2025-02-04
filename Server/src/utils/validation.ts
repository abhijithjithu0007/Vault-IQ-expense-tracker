import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  currency: z.string(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export const expenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be a positive number"),
  description: z.string().optional(),
});
