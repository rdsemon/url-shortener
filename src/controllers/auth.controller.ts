import type { RequestHandler } from "express";
import { testApi } from "../utils/apiTester.ts";

const signUp: RequestHandler = (req, res, next) => {
  console.log(req.body);

  testApi(res);
};

const login: RequestHandler = (req, res, next) => {
  console.log(req.body);

  testApi(res);
};

export { signUp, login };
