import type { Response } from "express";
const testApi = (res: Response) => {
  res.send("Test the api");
};

export { testApi };
