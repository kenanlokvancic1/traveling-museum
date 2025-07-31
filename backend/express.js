import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import openapiSpecification from "./swagger.config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import exhibitionRoutes from "./routes/exhibition.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import paintingRoutes from "./routes/painting.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import exhibitionPaintingRoutes from "./routes/exhibitionPainting.routes.js";
import museumRoutes from "./routes/museum.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import curatorRequestRoutes from "./routes/curatorRequest.routes.js";
import conditionReportsRoutes from "./routes/conditionReport.routes.js";

import config from "./config/config.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";
import requestLogger from "./middleware/requestLogger.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: config.development.frontend_url,
    credentials: true,
  })
);

const morganStream = {
  write: (message) => {
    logger.http(message.trim());
  },
};
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined", { stream: morganStream }));
} else {
  app.use(morgan("dev", { stream: morganStream }));
}


app.use(requestLogger);
app.use((req, res, next) => {
  req._startAt = process.hrtime();
  res.on("finish", () => {
    res._startAt = process.hrtime();
  });
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exhibitions", exhibitionRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/paintings", paintingRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/exhibitionpainting", exhibitionPaintingRoutes);
app.use("/api/museums", museumRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/curator-requests", curatorRequestRoutes);
app.use("/api/condition-reports", conditionReportsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(errorHandler);

app.get("/", (req, res) => {
  logger.info("GET / - Backend API root hit");
  res.send("backend API!");
});

app.all(/.*/, (req, res) => {
  logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route does not exist" });
});

export default app;
