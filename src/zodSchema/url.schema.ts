import * as z from "zod";

export const urlSchema = z.object({
  body: z.object({
    originalUrl: z.url(),
  }),
});
