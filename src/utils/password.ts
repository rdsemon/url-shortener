import bcrypt from "bcryptjs";

export const createHashPassword = async (password: string) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);

  return await bcrypt.hash(password, saltRounds);
};

export const validatePassword = async (userPass: string, dbPasss: string) => {
  return await bcrypt.compare(userPass, dbPasss);
};
