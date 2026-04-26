import type { Request, Response, NextFunction } from "express";

const sendErrorDev = (err: any, res: Response, statusCode: number) => {
  res.status(statusCode).json({
    status: err.status,
    error: err,
    stack: err.stackTrace,
    message: err.message,
  });
};

const duplicateKeyError = (err: any) => {
  const detail = err?.detail;

  const match = detail?.match(/\((.*?)\)=\((.*?)\)/);

  const value = match?.[2] ?? "Value";

  const message = `${value} already exists`;
  return message;
};

const sendErrorProd = (err: any, res: Response, statusCode: number) => {
  res.status(statusCode).json({ status: err.status, message: err });
};

console.log(process.env.NODE_ENV);

const handleGlobalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "production") {
    sendErrorDev(err, res, statusCode);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(err);
    let error = err;
    if (error.cause.code === "23505") {
      error = duplicateKeyError(error);
    }
    console.log(error);
    sendErrorProd(error, res, statusCode);
  }
};

export default handleGlobalError;
