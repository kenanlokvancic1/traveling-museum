import logger from "../utils/logger.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.warn("Access denied by role middleware", {
        userId: req.user.id,
        role: req.user.role,
        requiredRoles: roles,
        url: req.originalUrl,
      });
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
