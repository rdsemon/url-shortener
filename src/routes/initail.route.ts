import { hello } from "../controllers/initail.controller.ts";
import express from "express";
const router = express.Router();
router.get("/", hello);

export default router;
