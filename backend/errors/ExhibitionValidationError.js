import { ValidationError, NotFoundError } from "./AppError.js";

export const validateExhibitionData = ({
  name,
  start_date,
  end_date,
  museum_id,
  status,
  description,
}) => {
  if (!name || !name.trim()) {
    throw new ValidationError("Exhibition name is required");
  }

  if (!start_date) {
    throw new ValidationError("Start date is required");
  }

  if (!end_date) {
    throw new ValidationError("End date is required");
  }

  if (!museum_id) {
    throw new ValidationError("Museum ID is required");
  }

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (isNaN(startDate.getTime())) {
    throw new ValidationError("Invalid start date format");
  }

  if (isNaN(endDate.getTime())) {
    throw new ValidationError("Invalid end date format");
  }

  if (startDate >= endDate) {
    throw new ValidationError("Start date must be before end date");
  }

  const validStatuses = ["in warehouse", "in transport", "delivered"];
  if (status && !validStatuses.includes(status)) {
    throw new ValidationError(
      `Status must be one of: ${validStatuses.join(", ")}`
    );
  }

  // Handle description - if it's an empty string, set to null
  const validatedDescription = description === "" ? null : description;

  return {
    name: name.trim(),
    start_date,
    end_date,
    museum_id,
    status,
    description: validatedDescription,
  };
};

export const validateExhibitionExists = (exhibition) => {
  if (!exhibition) {
    throw new NotFoundError("Exhibition not found");
  }
  return exhibition;
};

export const validateExhibitionFilters = ({
  search,
  status,
  startDate,
  endDate,
  museumId,
}) => {
  if (startDate && isNaN(new Date(startDate).getTime())) {
    throw new ValidationError("Invalid start date filter format");
  }

  if (endDate && isNaN(new Date(endDate).getTime())) {
    throw new ValidationError("Invalid end date filter format");
  }

  const validStatuses = ["in warehouse", "in transport", "delivered"];
  if (status && !validStatuses.includes(status)) {
    throw new ValidationError(
      `Invalid status filter. Must be one of: ${validStatuses.join(", ")}`
    );
  }

  if (museumId && !Number.isInteger(Number(museumId))) {
    throw new ValidationError("Invalid museum ID format");
  }

  return { search, status, startDate, endDate, museumId };
};
