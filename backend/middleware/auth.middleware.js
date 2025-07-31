import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const protect = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.warn("No token provided in protect middleware", {
      url: req.originalUrl,
    });
    return res.status(401).json({ error: "Not authorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.warn("Token verification error", {
      error: err.message,
      url: req.originalUrl,
    });
    return res.status(401).json({ error: "Token invalid or expired" });
  }
};
