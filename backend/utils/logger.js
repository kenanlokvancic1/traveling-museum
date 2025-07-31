import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const cleanJsonFormat = winston.format.combine(
  winston.format.timestamp({
    format: () => new Date().toISOString(),
  }),
  winston.format.printf(({ level, message, timestamp }) =>
    JSON.stringify({ level, message, timestamp })
  )
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  levels,
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
      format: cleanJsonFormat,
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
      format: cleanJsonFormat,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/exceptions.log"),
      format: cleanJsonFormat,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/rejections.log"),
      format: cleanJsonFormat,
    }),
  ],
});

// Optional: add colored console output only in development
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple()
//       ),
//     })
//   );
// }

export default logger;
