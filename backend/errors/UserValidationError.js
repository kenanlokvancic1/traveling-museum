import { ValidationError, NotFoundError } from "./AppError.js";

export const validateUserUpdate = ({
  name,
  mobile_number,
  address,
  role,
  isActive,
}) => {
  if (name && typeof name !== "string") {
    throw new ValidationError("Name must be a string");
  }

  if (mobile_number && !/^\+?[\d\s-]+$/.test(mobile_number)) {
    throw new ValidationError("Invalid mobile number format");
  }

  if (role && !["user", "curator", "admin"].includes(role)) {
    throw new ValidationError("Invalid role specified");
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    throw new ValidationError("isActive must be a boolean");
  }

  return { name, mobile_number, address, role, isActive };
};

export const validateUserExists = (user) => {
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};
