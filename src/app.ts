import express from "express";
import urlRoute from "./routes/url.routes.js";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import hanldeInvallidRoute from "./middlewares/invalidRoute.js";
import handleGlobalError from "./controllers/error.controller.js";
import { loger } from "./middlewares/logger.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use(rateLimiter);
app.use(loger);

app.use("/api/v1", urlRoute);
app.use("/api/v1", authRoute);

app.use(hanldeInvallidRoute);
app.use(handleGlobalError);

export default app;
