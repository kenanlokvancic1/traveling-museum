import { ValidationError, NotFoundError } from "./AppError.js";

export const validateArtistData = ({
  name,
  birth_year,
  death_year,
  nationality,
  biography,
  image_url,
}) => {
  if (!name || !name.trim()) {
    throw new ValidationError("Artist name is required");
  }

  if (birth_year) {
    const birthYear = parseInt(birth_year);
    if (isNaN(birthYear)) {
      throw new ValidationError("Invalid birth year format");
    }
  }

  if (death_year) {
    const deathYear = parseInt(death_year);
    if (isNaN(deathYear)) {
      throw new ValidationError("Invalid death year format");
    }

    if (birth_year && birth_year >= death_year) {
      throw new ValidationError("Death year must be after birth year");
    }
  }

  if (nationality && typeof nationality !== "string") {
    throw new ValidationError("Nationality must be a string");
  }

  if (biography && typeof biography !== "string") {
    throw new ValidationError("Biography must be a string");
  }

  if (image_url && typeof image_url !== "string") {
    throw new ValidationError("Image URL must be a string");
  }

  return {
    name: name.trim(),
    birth_year,
    death_year,
    nationality: nationality?.trim(),
    biography: biography?.trim(),
    image_url: image_url?.trim(),
  };
};

export const validateArtistExists = (artist) => {
  if (!artist) {
    throw new NotFoundError("Artist not found");
  }
  return artist;
};
