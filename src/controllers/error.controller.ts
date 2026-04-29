import AppError from "../utils/appError.js";
import type { Request, Response, NextFunction } from "express";

// database errors

const handleDuplicateKeyError = (err: any) => {
  const detail = err?.cause?.detail || err?.detail || "";
  const match = detail.match(/\((.*?)\)=\((.*?)\)/);

  let message = "Duplicate field value violates unique constraint";

  if (match) {
    message = `The ${match[1]} '${match[2]}' is already taken.`;
  }

  return new AppError(message, 400);
};

const handleForenginKeyError = () => new AppError("Foregin key not found", 404);

// jwt errors
const handleJsonWebTokenError = (err: any) => {
  const message = `${err.message} please login again`;
  return new AppError(message, 401);
};

const handleInvalidJsonToken = () => new AppError("Invalid token", 401);

// send error in production
const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode || 500)
      .json({ status: err.status, message: err.message });
  }

  console.log(err);

  res.status(500).json({ status: "error", message: "something went wrong" });
};

// send error in development
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};
console.log(process.env.NODE_ENV);

const handleGlobalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "external error";

  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message, status: err.status };
    const dbErrorCode = error?.cause?.code;

    if (dbErrorCode === "23505") error = handleDuplicateKeyError(error);

    if (dbErrorCode === "23502") error = handleForenginKeyError();

    if (error.name === "TokenExpiredError")
      error = handleJsonWebTokenError(error);

    if (error.name === "JsonWebTokenError") error = handleInvalidJsonToken();
    sendErrorProd(error, res);
  }
};

export default handleGlobalError;
