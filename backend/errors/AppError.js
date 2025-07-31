class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation Error", errors = []) {
    super(message, 400);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Access forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

class ConflictError extends AppError {
  constructor(message = "Resource conflict") {
    super(message, 409);
    this.name = "ConflictError";
  }
}

class DatabaseError extends AppError {
  constructor(message = "Database error occurred") {
    super(message, 500);
    this.name = "DatabaseError";
  }
}

class ServiceError extends AppError {
  constructor(message = "Service error occurred") {
    super(message, 503);
    this.name = "ServiceError";
  }
}

class ExhibitionPaintingError extends AppError {
  constructor(message, statusCode = 400) {
    super(message, statusCode);
    this.name = "ExhibitionPaintingError";
  }

  static exhibitionNotFound() {
    return new ExhibitionPaintingError("Exhibition not found", 404);
  }

  static paintingNotFound() {
    return new ExhibitionPaintingError("Painting not found", 404);
  }

  static finishedExhibition() {
    return new ExhibitionPaintingError(
      "Cannot add painting to a finished exhibition",
      400
    );
  }

  static overlappingExhibition(paintingTitle) {
    return new ExhibitionPaintingError(
      `Painting "${paintingTitle}" is assigned to an overlapping exhibition`,
      409
    );
  }
}

export {
  AppError,
  BadRequestError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  DatabaseError,
  ServiceError,
  ExhibitionPaintingError,
};
