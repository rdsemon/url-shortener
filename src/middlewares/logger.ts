import morgan from "morgan";
import fs from "fs";
import path from "path";

const logsDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const accessLogstream = fs.createWriteStream(path.join(logsDir, "access.log"), {
  flags: "a",
});

export const loger = morgan("combined", { stream: accessLogstream });
