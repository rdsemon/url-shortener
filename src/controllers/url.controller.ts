import { testApi } from "../utils/apiTester.ts";
import type { Request, Response, NextFunction } from "express";
const createShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body);

  testApi(res);
};

export { createShortUrl };
