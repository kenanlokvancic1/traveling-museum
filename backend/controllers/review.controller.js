import * as reviewService from "../services/review.service.js";
import ReviewCreateRequestDTO from "../dto/review/requests/ReviewCreateRequestDTO.js";
import ReviewUpdateRequestDTO from "../dto/review/requests/ReviewUpdateRequestDTO.js";
import ReviewResponseDTO from "../dto/review/responses/ReviewResponseDTO.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFoundError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const getAllReviews = errorHandler(async (req, res) => {
  logger.info("Get all reviews request received", { query: req.query });
  const filters = {
    userId: req.query.userId,
    exhibitionId: req.query.exhibitionId,
    minRating: req.query.minRating,
  };

  const reviews = await reviewService.getReviews(filters);
  const reviewDTOs = reviews.map((review) => new ReviewResponseDTO(review));
  logger.info("All reviews retrieved", { count: reviewDTOs.length });
  return res.status(200).json(reviewDTOs);
});

export const getReviewById = errorHandler(async (req, res) => {
  logger.info("Get review by ID request received", { id: req.params.id });
  const { id } = req.params;
  const review = await reviewService.getReviewById(id);

  if (!review) {
    logger.warn("Review not found", { id });
    throw new NotFoundError("Review not found");
  }

  logger.info("Review retrieved", { id });
  return res.status(200).json(new ReviewResponseDTO(review));
});

export const createReview = errorHandler(async (req, res) => {
  logger.info("Create review request received", { body: req.body });
  const reviewDTO = new ReviewCreateRequestDTO(req.body);

  if (!reviewDTO.user_id && req.user) {
    reviewDTO.user_id = req.user.user_id;
  }

  const review = await reviewService.createReview(reviewDTO);
  logger.info("Review created successfully", { reviewId: review.review_id });
  return res.status(201).json(new ReviewResponseDTO(review));
});

export const updateReview = errorHandler(async (req, res) => {
  logger.info("Update review request received", {
    id: req.params.id,
    body: req.body,
  });
  const { id } = req.params;
  const reviewDTO = new ReviewUpdateRequestDTO(req.body);

  const review = await reviewService.updateReview(id, reviewDTO);
  if (!review) {
    logger.warn("Review not found for update", { id });
    throw new NotFoundError("Review not found");
  }
  logger.info("Review updated successfully", { id });
  return res.status(200).json(new ReviewResponseDTO(review));
});

export const deleteReview = errorHandler(async (req, res) => {
  logger.info("Delete review request received", { id: req.params.id });
  const { id } = req.params;
  const result = await reviewService.deleteReview(id);
  if (!result) {
    logger.warn("Review not found for deletion", { id });
    throw new NotFoundError("Review not found");
  }
  logger.info("Review deleted successfully", { id });
  return res.status(204).end();
});

export const getExhibitionAverageRating = errorHandler(async (req, res) => {
  logger.info("Get exhibition average rating request received", {
    exhibitionId: req.params.exhibitionId,
  });
  const { exhibitionId } = req.params;
  const ratingData =
    await reviewService.getAverageRatingForExhibition(exhibitionId);
  if (!ratingData) {
    logger.warn("No ratings found for exhibition", { exhibitionId });
    throw new NotFoundError("No ratings found for this exhibition");
  }
  logger.info("Exhibition average rating retrieved", { exhibitionId });
  return res.status(200).json(ratingData);
});
