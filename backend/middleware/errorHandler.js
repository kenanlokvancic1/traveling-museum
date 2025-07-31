import logger from "../utils/logger.js";

const errorHandler = (ctrlFunction) => async (req, res, next) => {
  try {
    return await ctrlFunction(req, res, next);
  } catch (error) {
    logger.error({
      message: `${req.method} ${req.originalUrl} - ${error.message}`,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        statusCode: error.statusCode,
      },
      request: {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        params: req.params,
        query: req.query,
      },
    });

    if (error.statusCode) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }

    switch (error.name) {
      case "SequelizeValidationError":
        return res.status(400).json({
          status: "fail",
          message: "Validation Error",
          errors: error.errors.map((e) => ({
            field: e.path,
            message: e.message,
          })),
        });

      case "SequelizeUniqueConstraintError":
        return res.status(409).json({
          status: "fail",
          message: "Duplicate Entry",
          errors: error.errors.map((e) => ({
            field: e.path,
            message: e.message,
          })),
        });

      default:
        logger.error({
          message: "Unexpected error occurred",
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        });

        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
    }
  }
};

export default errorHandler;
