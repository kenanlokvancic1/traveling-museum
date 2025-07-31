import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5432,
    jwtExpiration: process.env.JWT_EXPIRES_IN || "1d",
    frontend_url: process.env.FRONTEND_URL,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5432,
    jwtExpiration: process.env.JWT_EXPIRES_IN || "1d",
    frontend_url: process.env.FRONTEND_URL,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5432,
    jwtExpiration: process.env.JWT_EXPIRES_IN || "1d",
    frontend_url: process.env.FRONTEND_URL,
  },
  server: {
    port: process.env.PORT || 5001,
  },
};
