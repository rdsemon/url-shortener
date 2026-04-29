import jwt from "jsonwebtoken";
import type { Response } from "express";

export const sendJwt = (userId: string, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

  const expiresIn = process.env.JWT_EXPIRES_IN ?? "10m";

  // @ts-expect-error: jsonwebtoken overload issue with expiresIn type

  const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 60 * 1000,
  });

  return token;
};
