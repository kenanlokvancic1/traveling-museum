import { ValidationError, NotFoundError } from "./AppError.js";

export const validateFavoriteData = ({ user_id, painting_id }) => {
  if (!user_id) {
    throw new ValidationError("User ID is required");
  }

  if (!painting_id) {
    throw new ValidationError("Painting ID is required");
  }

  if (!Number.isInteger(Number(user_id))) {
    throw new ValidationError("Invalid user ID format");
  }

  if (!Number.isInteger(Number(painting_id))) {
    throw new ValidationError("Invalid painting ID format");
  }

  return {
    user_id: Number(user_id),
    painting_id: Number(painting_id),
  };
};

export const validateFavoriteExists = (favorite) => {
  if (!favorite) {
    throw new NotFoundError("Favorite not found");
  }
  return favorite;
};

export const validateFavoriteFilters = ({ userId }) => {
  if (userId && !Number.isInteger(Number(userId))) {
    throw new ValidationError("Invalid user ID format");
  }

  return {
    userId: userId ? Number(userId) : undefined,
  };
};
