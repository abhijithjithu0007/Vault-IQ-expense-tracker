import { CustomError } from "./customError";

const duplicateKeyErrorHandler = (err: {
  keyValue: Record<string, string>;
}) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  return new CustomError(`${value} already exists!`, 400);
};

const validationErrorHandler = (err: {
  errors: { [key: string]: { message: string } };
}) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

export { duplicateKeyErrorHandler, validationErrorHandler };
