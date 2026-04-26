import express from "express";
import { createShortUrl, getUrlByCode } from "../controllers/url.controller.js";
import validateInput from "../middlewares/zodValidator.js";
import { urlSchema, urlParamsSchema } from "../zodSchema/url.schema.js";
import { protect } from "../controllers/auth.controller.js";
const router = express.Router();

router
  .route("/shorten")
  .post(validateInput(urlSchema), protect, createShortUrl);
router.route("/:shortCode").get(validateInput(urlParamsSchema), getUrlByCode);

export default router;
