export default class ConditionReportRequestDTO {
  constructor(title, description, images, painting_id) {
    this.title = title;
    this.description = description;
    this.images = images || [];
    this.painting_id = painting_id;
  }

  static fromRequest(req) {
    return new ConditionReportRequestDTO(
      req.body.title,
      req.body.description,
      req.body.images,
      req.body.painting_id
    );
  }
}