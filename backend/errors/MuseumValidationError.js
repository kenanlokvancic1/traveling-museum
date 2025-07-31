import { ValidationError, NotFoundError } from "./AppError.js";

export const validateMuseumData = ({
  name,
  location,
  website,
  contact,
  description,
  coordinates,
}) => {
  if (!name || !name.trim()) {
    throw new ValidationError("Museum name is required");
  }

  if (!location || !location.trim()) {
    throw new ValidationError("Museum location is required");
  }

  if (website && typeof website !== "string") {
    throw new ValidationError("Website must be a string");
  }

  if (contact && typeof contact !== "string") {
    throw new ValidationError("Contact must be a string");
  }

  if (description && typeof description !== "string") {
    throw new ValidationError("Description must be a string");
  }

  if (coordinates && typeof coordinates !== "string") {
    throw new ValidationError("Coordinates must be a string");
  }

  return {
    name: name.trim(),
    location: location.trim(),
    website: website?.trim(),
    contact: contact?.trim(),
    description: description?.trim(),
    coordinates: coordinates?.trim(),
  };
};

export const validateMuseumExists = (museum) => {
  if (!museum) {
    throw new NotFoundError("Museum not found");
  }
  return museum;
};
