import * as z from "zod";

export const urlSchema = z.object({
  body: z.object({
    originalUrl: z.url(),
  }),
});

export const urlParamsSchema = z.object({
  params: z.object({
    shortCode: z.string(),
  }),
});
