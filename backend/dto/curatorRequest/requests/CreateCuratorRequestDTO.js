class CreateCuratorRequestDTO {
    constructor({ user_id, message, cv_url, additional_files }) {
      this.user_id = user_id;
      this.message = message;
      this.cv_url = cv_url;
      this.additional_files = additional_files;
    }
  }
  
  export default CreateCuratorRequestDTO;