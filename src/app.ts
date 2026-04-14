import express from "express";
import urlRoute from "./routes/url.routes.ts";
import authRoute from "./routes/auth.routes.ts";

const app = express();
app.use(express.json({ limit: "100kb" }));

app.use("/api/v1", urlRoute);
app.use("/api/v1", authRoute);

export default app;
