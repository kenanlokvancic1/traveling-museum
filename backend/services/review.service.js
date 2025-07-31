import { Op } from "sequelize";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Exhibition from "../models/exhibition.model.js";
import {
  validateReviewData,
  validateReviewExists,
  validateReviewFilters,
} from "../errors/ReviewValidationError.js";
import logger from "../utils/logger.js";

export const getReviews = async (filters = {}) => {
  logger.debug("Validating review filters", { filters });
  const validatedFilters = validateReviewFilters(filters);
  const { userId, exhibitionId, minRating } = validatedFilters;

  const whereClause = {};

  if (userId) {
    whereClause.user_id = userId;
  }

  if (exhibitionId) {
    whereClause.exhibition_id = exhibitionId;
  }

  if (minRating) {
    whereClause.rating = { [Op.gte]: minRating };
  }

  logger.debug("Fetching reviews with filters", { whereClause });
  const reviews = await Review.findAll({
    where: whereClause,
    include: [
      {
        model: User,
        attributes: ["user_id", "name"],
      },
      {
        model: Exhibition,
        as: "Exhibition",
        attributes: ["exhibition_id", "name"],
      },
    ],
  });
  logger.info("Retrieved reviews", { count: reviews.length });
  return reviews;
};

export const getReviewById = async (id) => {
  logger.debug("Fetching review by ID", { id });
  const review = await Review.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["user_id", "name"],
      },
      {
        model: Exhibition,
        as: "Exhibition",
        attributes: ["exhibition_id", "name"],
      },
    ],
  });
  validateReviewExists(review);
  logger.info("Retrieved review", { id: review?.review_id });
  return review;
};

export const createReview = async (reviewData) => {
  logger.debug("Validating review data", { data: reviewData });
  const validatedData = validateReviewData(reviewData);
  logger.debug("Creating new review in database");
  const review = await Review.create(validatedData);
  logger.info("New review created", { reviewId: review.review_id });
  const created = await Review.findByPk(review.review_id, {
    include: [
      {
        model: User,
        attributes: ["user_id", "name"],
      },
      {
        model: Exhibition,
        as: "Exhibition",
        attributes: ["exhibition_id", "name"],
      },
    ],
  });
  return created;
};

export const updateReview = async (id, reviewData) => {
  logger.debug("Updating review", { id, updateData: reviewData });
  const review = await Review.findByPk(id);
  validateReviewExists(review);

  const validatedData = validateReviewData(reviewData);
  await review.update(validatedData);

  logger.info("Review updated successfully", { id: review.review_id });
  const updated = await Review.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["user_id", "name"],
      },
      {
        model: Exhibition,
        as: "Exhibition",
        attributes: ["exhibition_id", "name"],
      },
    ],
  });
  return updated;
};

export const deleteReview = async (id) => {
  logger.debug("Attempting to delete review", { id });
  const review = await Review.findByPk(id);
  validateReviewExists(review);
  await review.destroy();
  logger.info("Review deleted", { id });
  return true;
};

export const getAverageRatingForExhibition = async (exhibitionId) => {
  logger.debug("Calculating average rating for exhibition", { exhibitionId });
  const result = await Review.findAll({
    where: { exhibition_id: exhibitionId },
    attributes: [
      [
        Review.sequelize.fn("AVG", Review.sequelize.col("rating")),
        "averageRating",
      ],
      [
        Review.sequelize.fn("COUNT", Review.sequelize.col("review_id")),
        "totalReviews",
      ],
    ],
    raw: true,
  });

  const averageRating = result[0]?.averageRating
    ? parseFloat(result[0].averageRating).toFixed(1)
    : "0.0";
  const totalReviews = result[0]?.totalReviews || 0;

  logger.info("Average rating calculated", {
    exhibitionId,
    averageRating,
    totalReviews,
  });

  return {
    averageRating,
    totalReviews,
  };
};
