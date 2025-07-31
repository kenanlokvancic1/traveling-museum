export default class NotificationRequestDTO {
    constructor({ user_id, title, details, time, read}) {
      this.user_id = user_id;
      this.title = title;
      this.details = details;
      this.time = time || new Date();
      this.read = read;
    }
  }
    