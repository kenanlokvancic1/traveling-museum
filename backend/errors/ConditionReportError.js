export class ConditionReportError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static reportNotFound() {
    return new ConditionReportError("Condition report not found", 404);
  }

  static paintingNotFound() {
    return new ConditionReportError("Painting not found", 404);
  }

  static invalidReportData() {
    return new ConditionReportError("Invalid condition report data", 400);
  }
}