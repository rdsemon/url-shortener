import type { Request, Response } from "express";

export const hello = (req: Request, res: Response) => {
  res.send("Hello from the server");
};
