import express from 'express'
import { login, signUp } from "../controllers/auth.controller.ts";
const router = express.Router()

router.post('/auth', signUp)
router.post('/auth', login)

export default router;
