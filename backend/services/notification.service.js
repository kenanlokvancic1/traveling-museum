import Notification from "../models/notification.model.js";
import NotificationRequestDTO from "../dto/notification/requests/NotificationRequestDTO.js";
import NotificationResponseDTO from "../dto/notification/responses/NotificationResponseDTO.js";
import { Op } from "sequelize";
import WebSocketManager from "../websocket/WebSocketManager.js";
import logger from "../utils/logger.js";

class NotificationService {
  async createNotification(data) {
    logger.debug("Creating notification", { data });
    const dto = new NotificationRequestDTO(data);
    const notification = await Notification.create(dto);
    const responseDto = new NotificationResponseDTO(notification);

    logger.info("Notification created", {
      notification_id: notification.notification_id,
      user_id: dto.user_id,
    });
    WebSocketManager.sendNotification(dto.user_id, responseDto);

    return responseDto;
  }

  async getAllNotifications() {
    logger.debug("Fetching all notifications");
    const notifications = await Notification.findAll({
      order: [["time", "DESC"]],
    });
    logger.info("Retrieved all notifications", { count: notifications.length });
    return notifications.map((n) => new NotificationResponseDTO(n));
  }

  async getNotificationsByUserId(userId) {
    logger.debug("Fetching notifications by user ID", { userId });
    const notifications = await Notification.findAll({
      where: { user_id: userId },
      order: [["time", "DESC"]],
    });
    logger.info("Retrieved notifications for user", {
      userId,
      count: notifications.length,
    });
    return notifications.map((n) => new NotificationResponseDTO(n));
  }

  async updateNotification(id, data) {
    logger.debug("Updating notification", { id, updateData: data });
    const [updated] = await Notification.update(
      { read: data.read },
      {
        where: { notification_id: id },
      }
    );
    logger.info("Notification update result", { id, updated });
    return updated === 1;
  }

  async deleteNotification(id) {
    logger.debug("Deleting notification", { id });
    const deleted = await Notification.destroy({
      where: { notification_id: id },
    });
    logger.info("Notification delete result", { id, deleted });
    return deleted === 1;
  }
}

export default new NotificationService();
