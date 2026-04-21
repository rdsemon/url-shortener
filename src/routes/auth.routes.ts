import express from "express";
import { login, signUp } from "../controllers/auth.controller.ts";
import validateInput from "../middlewares/zodValidator.ts";
import { loginSchema, singUpSchema } from "../zodSchema/auth.schema.ts";
const router = express.Router();

router.post("/auth/signUp", validateInput(singUpSchema), signUp);
router.post("/auth/login", validateInput(loginSchema), login);

export default router;
