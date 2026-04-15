import { testApi } from "../utils/apiTester.ts";
import type { RequestHandler } from "express";
const createShortUrl: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  testApi(res);
};

export { createShortUrl };
