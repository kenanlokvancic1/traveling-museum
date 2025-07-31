import { ValidationError } from "./AppError.js";

export const validatePasswordChange = ({
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  if (!currentPassword || !currentPassword.trim()) {
    throw new ValidationError("Current password is required");
  }

  if (!newPassword || !newPassword.trim()) {
    throw new ValidationError("New password is required");
  }

  if (!confirmPassword || !confirmPassword.trim()) {
    throw new ValidationError("Password confirmation is required");
  }

  if (newPassword.length < 6) {
    throw new ValidationError(
      "New password must be at least 6 characters long"
    );
  }

  if (newPassword !== confirmPassword) {
    throw new ValidationError("New password and confirmation do not match");
  }

  if (currentPassword === newPassword) {
    throw new ValidationError(
      "New password must be different from current password"
    );
  }

  return {
    currentPassword,
    newPassword,
    confirmPassword,
  };
};
