export default class ConditionReportResponseDTO {
  constructor(condition_report_id, title, description, created_at, images, painting_id) {
    this.condition_report_id = condition_report_id;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.images = images || [];
    this.painting_id = painting_id;
  }

  static fromEntity(entity) {
    return new ConditionReportResponseDTO(
      entity.condition_report_id,
      entity.title,
      entity.description,
      entity.created_at,
      entity.images,
      entity.painting_id
    );
  }
}