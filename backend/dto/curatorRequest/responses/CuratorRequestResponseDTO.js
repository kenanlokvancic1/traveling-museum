class CuratorRequestResponseDTO {
  constructor(entity) {
    this.curator_request_id = entity.curator_request_id;
    this.user_id = entity.user_id;
    this.motivation = entity.motivation;
    this.cv_url = entity.cv_url;
    this.additional_files = entity.additional_files;
    this.assigned_admin_id = entity.assigned_admin_id;
    this.status = entity.status;
    this.created_at = entity.created_at;
  }
}

export default CuratorRequestResponseDTO;