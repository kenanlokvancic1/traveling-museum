class UpdateCuratorRequestDTO {
    constructor({ status, assigned_admin_id }) {
      this.status = status;
      this.assigned_admin_id = assigned_admin_id;
    }
  }
  
  export default UpdateCuratorRequestDTO;