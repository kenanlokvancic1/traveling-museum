import { ValidationError, NotFoundError } from "./AppError.js";

export const validateReviewData = ({
  rating,
  comment,
  user_id,
  exhibition_id,
}) => {
  if (!rating) {
    throw new ValidationError("Rating is required");
  }

  const numRating = Number(rating);
  if (
    isNaN(numRating) ||
    numRating < 1 ||
    numRating > 5 ||
    !Number.isInteger(numRating)
  ) {
    throw new ValidationError("Rating must be an integer between 1 and 5");
  }

  if (!user_id) {
    throw new ValidationError("User ID is required");
  }

  if (!exhibition_id) {
    throw new ValidationError("Exhibition ID is required");
  }

  if (comment && typeof comment !== "string") {
    throw new ValidationError("Comment must be a string");
  }

  if (comment && comment.length > 1000) {
    throw new ValidationError("Comment must be 1000 characters or less");
  }

  return {
    rating: numRating,
    comment: comment?.trim(),
    user_id,
    exhibition_id,
  };
};

export const validateReviewExists = (review) => {
  if (!review) {
    throw new NotFoundError("Review not found");
  }
  return review;
};

export const validateReviewFilters = ({ userId, exhibitionId, minRating }) => {
  if (userId && !Number.isInteger(Number(userId))) {
    throw new ValidationError("Invalid user ID format");
  }

  if (exhibitionId && !Number.isInteger(Number(exhibitionId))) {
    throw new ValidationError("Invalid exhibition ID format");
  }

  if (minRating) {
    const rating = Number(minRating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new ValidationError("Minimum rating must be between 1 and 5");
    }
  }

  return {
    userId,
    exhibitionId,
    minRating: minRating ? Number(minRating) : undefined,
  };
};
