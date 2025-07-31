export const validatePasswordChange = (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  const errors = {};
  let isValid = true;

  if (!currentPassword) {
    errors.currentPassword = "Current password is required";
    isValid = false;
  }

  if (!newPassword) {
    errors.newPassword = "New password is required";
    isValid = false;
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters long";
    isValid = false;
  }

  if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return { isValid, errors };
};

export const validatePasswordReset = (password, confirmPassword) => {
  const errors = {};
  let isValid = true;

  if (!password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
    isValid = false;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateEmail = (email) => {
  const errors = {};
  let isValid = true;

  if (!email || !email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Invalid email address";
    isValid = false;
  }

  return { isValid, errors };
};
