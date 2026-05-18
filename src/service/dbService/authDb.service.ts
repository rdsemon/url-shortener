import { eq } from "drizzle-orm";
import db from "../../database.js";
import usersTable from "../../models/user.model.js";
import AppError from "../../utils/appError.js";

interface userDataType {
  name: string;
  email: string;
  hashPassword: string;
}

export const signUpService = async (userData: userDataType) => {
  const [user] = await db
    .insert(usersTable)
    .values(userData)
    .returning({ id: usersTable.id });

  if (!user) throw new AppError(`SignUp fail try again`, 400);

  return user;
};

export const loginService = async (email: string) => {
  const [user] = await db
    .select({ password: usersTable.hashPassword, id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) throw new AppError("user not found", 404);

  return user;
};
