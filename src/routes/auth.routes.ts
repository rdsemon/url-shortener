import express from "express";
import { login, signUp } from "../controllers/auth.controller.js";
import validateInput from "../middlewares/zodValidator.js";
import { loginSchema, singUpSchema } from "../zodSchema/auth.schema.js";
const router = express.Router();

router.post("/auth/signUp", validateInput(singUpSchema), signUp);
router.post("/auth/login", validateInput(loginSchema), login);

export default router;
