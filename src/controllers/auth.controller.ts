import type { Request, Response, NextFunction } from "express";
import { testApi } from "../utils/apiTester.ts";
const signUp = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  testApi(res);
};

const login = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  testApi(res);
};

export { signUp, login };
