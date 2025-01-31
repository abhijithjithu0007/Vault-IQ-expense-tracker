import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: {
    id: number;
  } & JwtPayload;
}

export type JwtDecoded = {
  id: number;
  role: "user" | "admin";
};
