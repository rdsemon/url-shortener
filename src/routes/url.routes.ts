import express from "express";
import { createShortUrl, getUrlByCode } from "../controllers/url.controller.ts";
import validateInput from "../middlewares/zodValidator.ts";
import { urlSchema } from "../zodSchema/url.schema.ts";
import { protect } from "../controllers/auth.controller.ts";
const router = express.Router();

router.route("/shorten").post(validateInput(urlSchema), createShortUrl);
router.route("/:shortCode").get(getUrlByCode);

export default router;
