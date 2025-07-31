import logger from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  logger.info({
    message: `Incoming request: ${req.method} ${req.originalUrl}`,
    request: {
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      ip: req.ip,
      headers: {
        "user-agent": req.get("user-agent"),
        referer: req.get("referer"),
        "x-request-id": req.get("x-request-id"),
      },
    },
  });

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const responseStatus = res.statusCode;
    const logLevel = responseStatus >= 400 ? "warn" : "info";

    logger[logLevel]({
      message: `Request completed: ${req.method} ${req.originalUrl}`,
      response: {
        statusCode: responseStatus,
        duration: `${duration}ms`,
      },
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
    });
  });

  next();
};

export const detailedLogger = (req, res, next) => {
  logger.debug({
    message: `Detailed request information: ${req.method} ${req.originalUrl}`,
    request: {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
    },
  });
  next();
};

export default requestLogger;
