import * as z from "zod";

export const singUpSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1, { error: "name is required" }),
      email: z.email().toLowerCase().trim(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: `password dosen't match`,
      path: ["confirm"],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email().toLowerCase().trim(),
    password: z.string(),
  }),
});
