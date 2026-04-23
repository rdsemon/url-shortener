import type { Request, Response, NextFunction } from "express";

const handleGlobalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status: err.status, message: err.message });
};

export default handleGlobalError;
