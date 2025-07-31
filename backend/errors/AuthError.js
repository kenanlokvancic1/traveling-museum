import { AppError } from "./AppError.js";

class AuthError extends AppError {
  constructor(message, statusCode = 401) {
    super(message, statusCode);
    this.name = "AuthError";
  }

  static userNotFound() {
    return new AuthError("User not found", 404);
  }

  static invalidCredentials() {
    return new AuthError("Invalid credentials", 401);
  }

  static accountNotVerified() {
    return new AuthError("Account not verified", 401);
  }

  static userAlreadyExists() {
    return new AuthError("User already exists", 409);
  }

  static verificationNotFound() {
    return new AuthError("Verification not found", 404);
  }

  static verificationExpired() {
    return new AuthError("Verification code expired", 400);
  }

  static tooManyFailedAttempts() {
    return new AuthError("Too many failed attempts", 429);
  }

  static invalidVerificationCode() {
    return new AuthError("Invalid verification code", 400);
  }

  static maxResendAttemptsReached() {
    return new AuthError("Maximum resend attempts reached", 429);
  }

  static invalidToken() {
    return new AuthError("Token is invalid or expired", 401);
  }

  static passwordMismatch() {
    return new AuthError("Passwords do not match", 400);
  }

  static incorrectPassword() {
    return new AuthError("Incorrect password", 401);
  }
}

export default AuthError;
