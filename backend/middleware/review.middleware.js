import Review from "../models/review.model.js";
import logger from "../utils/logger.js";

export const validateReviewData = (req, res, next) => {
  const { rating, exhibition_id } = req.body;

  if (rating === undefined || exhibition_id === undefined) {
    logger.warn("Review validation failed: missing fields", { body: req.body });
    return res
      .status(400)
      .json({ error: "Rating and exhibition_id are required fields" });
  }

  if (rating < 1 || rating > 5 || !Number.isInteger(Number(rating))) {
    logger.warn("Review validation failed: invalid rating", { rating });
    return res
      .status(400)
      .json({ error: "Rating must be an integer between 1 and 5" });
  }

  if (req.body.comment && req.body.comment.length > 100) {
    logger.warn("Review validation failed: comment too long", {
      length: req.body.comment.length,
    });
    return res
      .status(400)
      .json({ error: "Comment must be 100 characters or less" });
  }

  next();
};

export const checkReviewOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(req.user.id);

    const review = await Review.findByPk(id);

    if (!review) {
      logger.warn("Review not found for ownership check", { id });
      return res.status(404).json({ error: "Review not found" });
    }

    const reviewUserId = parseInt(review.user_id);

    if (reviewUserId !== userId && req.user.role !== "admin") {
      logger.warn("Review ownership denied", {
        userId,
        reviewUserId,
        role: req.user.role,
      });
      return res.status(403).json({
        error: "You do not have permission to modify this review",
      });
    }

    next();
  } catch (error) {
    logger.error("Error in checkReviewOwnership", { error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const checkDuplicateReview = async (req, res, next) => {
  try {
    if (req.method !== "POST") {
      return next();
    }

    const userId = req.user ? req.user.user_id : req.body.user_id;
    const { exhibition_id } = req.body;

    if (!userId || !exhibition_id) {
      return next();
    }

    const existingReview = await Review.findOne({
      where: {
        user_id: userId,
        exhibition_id: exhibition_id,
      },
    });

    if (existingReview) {
      logger.warn("Duplicate review detected", { userId, exhibition_id });
      return res.status(400).json({
        error:
          "You have already reviewed this exhibition. You can update your existing review instead.",
      });
    }

    next();
  } catch (error) {
    logger.error("Error in checkDuplicateReview", { error: error.message });
    return res.status(500).json({ error: error.message });
  }
};
