import logger from "./utils/logger.js";
import config from "./config/config.js";
import sequelize from "./config/database.js";
import dotenv from "dotenv";
import app from "./express.js";
import db from "./models/index.js";
import express from 'express';
import http from 'http';
import WebSocketManager from './websocket/WebSocketManager.js';

dotenv.config();

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", { message: err.message, stack: err.stack });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", {
    message: reason?.message || reason,
    stack: reason?.stack,
  });
  process.exit(1);
});

const server = http.createServer(app);

WebSocketManager.initialize(server);

try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");

  await db.initialize();
  console.log("All models initialized with associations.");

  await sequelize.sync({ force: false });
  console.log("All models synchronized.");
} catch (err) {
  console.error("Unable to connect to the database:", err.message);
}

server.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
