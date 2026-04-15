import express from "express";
import { createShortUrl } from "../controllers/url.controller.ts";
const router = express.Router();

router.route("/url").post(createShortUrl);

export default router;
