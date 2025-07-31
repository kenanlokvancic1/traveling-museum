import notificationService from "../services/notification.service.js";
import logger from "../utils/logger.js";

class NotificationController {
  async createNotification(req, res) {
    logger.info("Create notification request received", { body: req.body });
    try {
      const notification = await notificationService.createNotification(
        req.body
      );
      logger.info("Notification created successfully");
      res.status(201).json(notification);
    } catch (error) {
      logger.error("Error creating notification", { error: error.message });
      res.status(500).json({ message: "Failed to create notification." });
    }
  }

  async getAllNotifications(req, res) {
    logger.info("Get all notifications request received");
    try {
      const notifications = await notificationService.getAllNotifications();
      logger.info("All notifications retrieved", {
        count: notifications.length,
      });
      res.status(200).json(notifications);
    } catch (error) {
      logger.error("Error fetching notifications", { error: error.message });
      res.status(500).json({ message: "Failed to fetch notifications." });
    }
  }

  async getNotificationsByUserId(req, res) {
    logger.info("Get notifications by user ID request received", {
      userId: req.params.userId,
    });
    try {
      const { userId } = req.params;
      const notifications =
        await notificationService.getNotificationsByUserId(userId);
      logger.info("Notifications retrieved for user", {
        userId,
        count: notifications.length,
      });
      res.status(200).json(notifications);
    } catch (error) {
      logger.error("Error fetching user notifications", {
        error: error.message,
      });
      res.status(500).json({ message: "Failed to fetch user notifications." });
    }
  }

  async deleteNotification(req, res) {
    logger.info("Delete notification request received", { id: req.params.id });
    try {
      const { id } = req.params;
      const deleted = await notificationService.deleteNotification(id);
      if (deleted) {
        logger.info("Notification deleted successfully", { id });
        res.status(200).json({ message: "Notification deleted successfully." });
      } else {
        logger.warn("Notification not found for deletion", { id });
        res.status(404).json({ message: "Notification not found." });
      }
    } catch (error) {
      logger.error("Error deleting notification", { error: error.message });
      res.status(500).json({ message: "Failed to delete notification." });
    }
  }

  async updateNotification(req, res) {
    logger.info("Update notification request received", {
      id: req.params.id,
      body: req.body,
    });
    try {
      const { id } = req.params;
      const { read } = req.body;
      const updated = await notificationService.updateNotification(id, {
        read,
      });
      if (updated) {
        logger.info("Notification updated successfully", { id });
        res.status(200).json({ message: "Notification updated successfully." });
      } else {
        logger.warn("Notification not found for update", { id });
        res.status(404).json({ message: "Notification not found." });
      }
    } catch (error) {
      logger.error("Error updating notification", { error: error.message });
      res.status(500).json({ message: "Failed to update notification." });
    }
  }
}

export default new NotificationController();
