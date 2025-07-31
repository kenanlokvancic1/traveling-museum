import { ValidationError } from "./AppError.js";

const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateLoginCredentials = ({ email, password }) => {
  if (!email || !email.trim()) {
    throw new ValidationError("Email is required");
  }

  const trimmedEmail = email.trim();
  if (!validateEmailFormat(trimmedEmail)) {
    throw new ValidationError("Invalid email format");
  }

  if (!password || !password.trim()) {
    throw new ValidationError("Password is required");
  }

  return {
    email: trimmedEmail,
    password,
  };
};

export const validateRegisterData = ({ name, email, password, role }) => {
  if (!name || !name.trim()) {
    throw new ValidationError("Name is required");
  }

  if (!email || !email.trim()) {
    throw new ValidationError("Email is required");
  }

  const trimmedEmail = email.trim();
  if (!validateEmailFormat(trimmedEmail)) {
    throw new ValidationError("Invalid email format");
  }

  if (!password || !password.trim()) {
    throw new ValidationError("Password is required");
  }

  if (password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters long");
  }

  if (role && !["user", "admin"].includes(role)) {
    throw new ValidationError("Invalid role specified");
  }

  return {
    name: name.trim(),
    email: trimmedEmail,
    password,
    role,
  };
};
