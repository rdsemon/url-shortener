import express from "express";
import { login, signUp } from "../controllers/auth.controller.ts";
import validateInput from "../middlewares/zodValidator.ts";
import { singUpSchema } from "../zodSchema/auth.schema.ts";
const router = express.Router();

router.post("/auth", validateInput(singUpSchema), signUp);
router.post("/auth", login);

export default router;
