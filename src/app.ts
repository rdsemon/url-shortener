import express from "express";
import initialRoute from "./routes/initail.route.ts";

const app = express();

app.use(initialRoute);

export default app;
