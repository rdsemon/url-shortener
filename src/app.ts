import express from "express";
import urlRoute from "./routes/url.routes.ts";
import authRoute from "./routes/auth.routes.ts";
import hanldeInvallidRoute from "./middlewares/invalidRoute.ts";
import handleGlobalError from "./controllers/error.controller.ts";
import { loger } from "./middlewares/logger.ts";

const app = express();
app.use(express.json({ limit: "100kb" }));

app.use(loger);

app.use("/api/v1", urlRoute);
app.use("/api/v1", authRoute);

app.use(hanldeInvallidRoute);
app.use(handleGlobalError);

export default app;
