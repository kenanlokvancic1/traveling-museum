import logger from "../utils/logger.js";

export const validateExhibitionData = (req, res, next) => {
  const { name, start_date, end_date, museum_id, status } = req.body;

  if (!name) {
    logger.warn("Exhibition validation failed: name missing", {
      body: req.body,
    });
    return res.status(400).json({ error: "Exhibition name is required" });
  }

  if (!start_date) {
    logger.warn("Exhibition validation failed: start_date missing", {
      body: req.body,
    });
    return res.status(400).json({ error: "Start date is required" });
  }

  if (!end_date) {
    logger.warn("Exhibition validation failed: end_date missing", {
      body: req.body,
    });
    return res.status(400).json({ error: "End date is required" });
  }

  if (!museum_id) {
    logger.warn("Exhibition validation failed: museum_id missing", {
      body: req.body,
    });
    return res.status(400).json({ error: "Museum ID is required" });
  }

  if (!status) {
    logger.warn("Exhibition validation failed: status missing", {
      body: req.body,
    });
    return res.status(400).json({ error: "Status is required" });
  }

  const validStatusValues = ["in warehouse", "in transport", "delivered"];
  if (!validStatusValues.includes(status)) {
    logger.warn("Exhibition validation failed: invalid status", { status });
    return res.status(400).json({
      error: `Status must be one of: ${validStatusValues.join(", ")}`,
    });
  }

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (isNaN(startDate.getTime())) {
    logger.warn("Exhibition validation failed: invalid start date", {
      start_date,
    });
    return res.status(400).json({ error: "Invalid start date format" });
  }

  if (isNaN(endDate.getTime())) {
    logger.warn("Exhibition validation failed: invalid end date", { end_date });
    return res.status(400).json({ error: "Invalid end date format" });
  }

  if (startDate >= endDate) {
    logger.warn("Exhibition validation failed: start date after end date", {
      start_date,
      end_date,
    });
    return res.status(400).json({
      error: "Start date must be before end date",
    });
  }

  next();
};

export const validateExhibitionUpdate = (req, res, next) => {
  const { start_date, end_date, status } = req.body;

  if (status) {
    const validStatusValues = ["in warehouse", "in transport", "delivered"];
    if (!validStatusValues.includes(status)) {
      logger.warn("Exhibition update validation failed: invalid status", {
        status,
      });
      return res.status(400).json({
        error: `Status must be one of: ${validStatusValues.join(", ")}`,
      });
    }
  }

  if (start_date && end_date) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate.getTime())) {
      logger.warn("Exhibition update validation failed: invalid start date", {
        start_date,
      });
      return res.status(400).json({ error: "Invalid start date format" });
    }

    if (isNaN(endDate.getTime())) {
      logger.warn("Exhibition update validation failed: invalid end date", {
        end_date,
      });
      return res.status(400).json({ error: "Invalid end date format" });
    }

    if (startDate >= endDate) {
      logger.warn(
        "Exhibition update validation failed: start date after end date",
        { start_date, end_date }
      );
      return res.status(400).json({
        error: "Start date must be before end date",
      });
    }
  }

  next();
};
