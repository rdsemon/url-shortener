import { testApi } from "../utils/apiTester.js";
import db from "../database.js";
import AppError from "../utils/appError.js";
import usersTable from "../models/user.model.js";
import asyncHandler from "../utils/catchAsyncErrorHandler.js";
import { eq } from "drizzle-orm";
import { sendJwt } from "../utils/sendJwt.js";
import { createHashPassword, validatePassword } from "../utils/password.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  id: string;
}

const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashPassword = await createHashPassword(password);

  const newUser = {
    name,
    email,
    hashPassword,
  };

  const [user] = await db
    .insert(usersTable)
    .values(newUser)
    .returning({ id: usersTable.id });

  if (!user) return next(new AppError(`SignUp fail try again`, 400));

  res.status(201).json({ status: "successful", userId: user.id });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await db
    .select({ password: usersTable.hashPassword, id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) return next(new AppError("user not found", 404));

  const correctPass = await validatePassword(password, user.password);

  if (!correctPass) return next(new AppError("incorrect password", 401));

  const token = sendJwt(user.id, res);

  res
    .status(200)
    .json({ status: "successful", token, message: "login successful" });
});

const protect = asyncHandler(async (req, res, next) => {
  let jwtToken;
  const jweSecret = process.env.JWT_SECRET;

  if (!jweSecret) return next(new AppError("Jwt secret is missing", 404));

  if (req.cookies?.token) {
    jwtToken = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer ")) {
    jwtToken = req.headers.authorization.split(" ")[1];
  }

  if (!jwtToken) return next(new AppError("Please login first", 404));

  const decode = jwt.verify(jwtToken, jweSecret) as MyJwtPayload;

  const [user] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.id, decode.id));

  if (!user) return next(new AppError("user not found", 404));

  req.user = user;

  next();
});

export { signUp, login, protect };
