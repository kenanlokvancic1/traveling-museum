export default class NotificationResponseDTO {
    constructor({ notification_id, user_id, title, details, time, read }) {
      this.notification_id = notification_id;
      this.user_id = user_id;
      this.title = title;
      this.details = details;
      this.time = time;
      this.read = read
    }
  }  