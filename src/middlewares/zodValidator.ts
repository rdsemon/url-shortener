import type { Request, Response, NextFunction } from "express";

import AppError from "../utils/appError.ts";

const validateInput = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      console.log(result.error.issues);

      const erros = result.error.issues.map((el) => el.message).join(" , ");

      return next(new AppError(erros, 404));
    }

    const { body, params, query } = result.data;

    req.body = body;
    req.params = params;
    req.query = query;

    next();
  };
};

export default validateInput;
