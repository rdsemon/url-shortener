import { testApi } from "../utils/apiTester.ts";
import db from "../database.ts";
import AppError from "../utils/appError.ts";
import usersTable from "../models/user.model.ts";
import asyncHandler from "../utils/catchAsyncErrorHandler.ts";
import { eq } from "drizzle-orm";
import { sendJwt } from "../utils/sendJwt.ts";
import { createHashPassword, validatePassword } from "../utils/passwrod.ts";

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

export { signUp, login };
