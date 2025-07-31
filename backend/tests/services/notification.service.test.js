import { describe, it, expect, vi, beforeEach } from "vitest";
import notificationService from "../../services/notification.service.js";
import Notification from "../../models/notification.model.js";
import NotificationRequestDTO from "../../dto/notification/requests/NotificationRequestDTO.js";
import NotificationResponseDTO from "../../dto/notification/responses/NotificationResponseDTO.js";
import WebSocketManager from "../../websocket/WebSocketManager.js";
import logger from "../../utils/logger.js";

describe("notification.service (unit tests)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "debug").mockImplementation(() => {});
    vi.spyOn(logger, "info").mockImplementation(() => {});
  });

  it("should create a notification and return DTO", async () => {
    const data = { user_id: 1, title: "Test", details: "Details", read: false };
    const fakeNotification = { notification_id: 10, ...data, time: new Date() };
    vi.spyOn(Notification, "create").mockResolvedValue(fakeNotification);
    const wsSpy = vi
      .spyOn(WebSocketManager, "sendNotification")
      .mockImplementation(() => {});

    const result = await notificationService.createNotification(data);

    expect(Notification.create).toHaveBeenCalledWith(
      expect.any(NotificationRequestDTO)
    );
    expect(result).toEqual(new NotificationResponseDTO(fakeNotification));
    expect(wsSpy).toHaveBeenCalledWith(1, expect.any(NotificationResponseDTO));
  });

  it("should get all notifications and return DTOs", async () => {
    const fakeNotifications = [
      {
        notification_id: 1,
        user_id: 1,
        title: "A",
        details: "a",
        time: new Date(),
        read: false,
      },
      {
        notification_id: 2,
        user_id: 2,
        title: "B",
        details: "b",
        time: new Date(),
        read: true,
      },
    ];
    vi.spyOn(Notification, "findAll").mockResolvedValue(fakeNotifications);

    const result = await notificationService.getAllNotifications();

    expect(Notification.findAll).toHaveBeenCalledWith({
      order: [["time", "DESC"]],
    });
    expect(result).toEqual(
      fakeNotifications.map((n) => new NotificationResponseDTO(n))
    );
  });

  it("should get notifications by user id and return DTOs", async () => {
    const fakeNotifications = [
      {
        notification_id: 1,
        user_id: 1,
        title: "A",
        details: "a",
        time: new Date(),
        read: false,
      },
    ];
    vi.spyOn(Notification, "findAll").mockResolvedValue(fakeNotifications);

    const result = await notificationService.getNotificationsByUserId(1);

    expect(Notification.findAll).toHaveBeenCalledWith({
      where: { user_id: 1 },
      order: [["time", "DESC"]],
    });
    expect(result).toEqual(
      fakeNotifications.map((n) => new NotificationResponseDTO(n))
    );
  });

  it("should update notification and return true if updated", async () => {
    vi.spyOn(Notification, "update").mockResolvedValue([1]);

    const result = await notificationService.updateNotification(10, {
      read: true,
    });

    expect(Notification.update).toHaveBeenCalledWith(
      { read: true },
      { where: { notification_id: 10 } }
    );
    expect(result).toBe(true);
  });

  it("should update notification and return false if not updated", async () => {
    vi.spyOn(Notification, "update").mockResolvedValue([0]);

    const result = await notificationService.updateNotification(10, {
      read: true,
    });

    expect(result).toBe(false);
  });

  it("should delete notification and return true if deleted", async () => {
    vi.spyOn(Notification, "destroy").mockResolvedValue(1);

    const result = await notificationService.deleteNotification(10);

    expect(Notification.destroy).toHaveBeenCalledWith({
      where: { notification_id: 10 },
    });
    expect(result).toBe(true);
  });

  it("should delete notification and return false if not deleted", async () => {
    vi.spyOn(Notification, "destroy").mockResolvedValue(0);

    const result = await notificationService.deleteNotification(10);

    expect(result).toBe(false);
  });
});
