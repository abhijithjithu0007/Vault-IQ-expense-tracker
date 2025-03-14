import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errors/customError";
import {
  duplicateKeyErrorHandler,
  validationErrorHandler,
} from "../utils/errors/handleErrors";

const errorResponse = (error: CustomError, res: Response) => {
  res.status(error.statusCode).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    errorCode: error.errorCode,
  });
};

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error);

  if (error instanceof CustomError) {
    errorResponse(error, res);
    return;
  }

  if (error.code === 11000) {
    const duplicateKeyError = duplicateKeyErrorHandler(error);
    errorResponse(duplicateKeyError, res);
    return;
  }

  if (error.name === "ValidationError") {
    const validationError = validationErrorHandler(error);
    errorResponse(validationError, res);
    return;
  }

  res.status(500).json({
    status: "fail",
    statusCode: 500,
    message: error?.message || "Something went wrong",
  });
};
