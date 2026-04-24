import express from "express";
import { createShortUrl } from "../controllers/url.controller.ts";
import validateInput from "../middlewares/zodValidator.ts";
import { urlSchema } from "../zodSchema/url.schema.ts";
import { protect } from "../controllers/auth.controller.ts";
const router = express.Router();

router.route("/url").post(validateInput(urlSchema), createShortUrl);

export default router;
