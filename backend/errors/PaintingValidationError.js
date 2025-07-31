import { ValidationError, NotFoundError } from "./AppError.js";

export const validatePaintingData = ({
  title,
  year,
  medium,
  artist_id,
  image_url,
  description,
  dimensions,
  location,
  provenance,
  shares,
}) => {
  if (!title || !title.trim()) {
    throw new ValidationError("Painting title is required");
  }

  if (year) {
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(yearNum) || yearNum < 0 || yearNum > currentYear) {
      throw new ValidationError(`Year must be between 0 and ${currentYear}`);
    }
  }

  if (!artist_id) {
    throw new ValidationError("Artist ID is required");
  }

  if (medium && typeof medium !== "string") {
    throw new ValidationError("Medium must be a string");
  }

  if (image_url && typeof image_url !== "string") {
    throw new ValidationError("Image URL must be a string");
  }

  if (description && typeof description !== "string") {
    throw new ValidationError("Description must be a string");
  }

  if (dimensions && typeof dimensions !== "string") {
    throw new ValidationError("Dimensions must be a string");
  }

  if (location && typeof location !== "string") {
    throw new ValidationError("Location must be a string");
  }

  if (provenance && typeof provenance !== "string") {
    throw new ValidationError("Provenance must be a string");
  }

  if (shares !== undefined) {
    const sharesNum = parseInt(shares);
    if (isNaN(sharesNum)) {
      throw new ValidationError("Shares must be a number");
    }
  }

  return {
    title: title.trim(),
    year,
    medium: medium?.trim(),
    artist_id,
    image_url: image_url?.trim(),
    description: description?.trim(),
    dimensions: dimensions?.trim(),
    location: location?.trim(),
    provenance: provenance?.trim(),
    shares: shares !== undefined ? parseInt(shares) : undefined,
  };
};

export const validatePaintingExists = (painting) => {
  if (!painting) {
    throw new NotFoundError("Painting not found");
  }
  return painting;
};
