import { describe, it, expect, vi, beforeEach } from "vitest";
import notificationController from "../../controllers/notification.controller.js";
import notificationService from "../../services/notification.service.js";
import logger from "../../utils/logger.js";

describe("notification.controller (unit tests)", () => {
  let req, res;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    vi.spyOn(logger, "error").mockImplementation(() => {});
    req = { body: {}, params: {} };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      send: vi.fn(() => res),
    };
  });

  it("should create notification and return 201", async () => {
    const fakeResult = {
      notification_id: 1,
      user_id: 1,
      title: "Test",
      details: "Details",
      read: false,
    };
    vi.spyOn(notificationService, "createNotification").mockResolvedValue(
      fakeResult
    );
    req.body = { user_id: 1, title: "Test", details: "Details", read: false };

    await notificationController.createNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(notificationService.createNotification).toHaveBeenCalledWith(
      req.body
    );
  });

  it("should handle error on create notification", async () => {
    vi.spyOn(notificationService, "createNotification").mockRejectedValue(
      new Error("fail")
    );
    req.body = { user_id: 1, title: "Test", details: "Details", read: false };

    await notificationController.createNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to create notification.",
    });
  });

  it("should get all notifications and return 200", async () => {
    const fakeResult = [{ notification_id: 1 }, { notification_id: 2 }];
    vi.spyOn(notificationService, "getAllNotifications").mockResolvedValue(
      fakeResult
    );

    await notificationController.getAllNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(notificationService.getAllNotifications).toHaveBeenCalled();
  });

  it("should handle error on get all notifications", async () => {
    vi.spyOn(notificationService, "getAllNotifications").mockRejectedValue(
      new Error("fail")
    );

    await notificationController.getAllNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to fetch notifications.",
    });
  });

  it("should get notifications by user id and return 200", async () => {
    const fakeResult = [{ notification_id: 1 }];
    vi.spyOn(notificationService, "getNotificationsByUserId").mockResolvedValue(
      fakeResult
    );
    req.params.userId = 1;

    await notificationController.getNotificationsByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(notificationService.getNotificationsByUserId).toHaveBeenCalledWith(
      1
    );
  });

  it("should handle error on get notifications by user id", async () => {
    vi.spyOn(notificationService, "getNotificationsByUserId").mockRejectedValue(
      new Error("fail")
    );
    req.params.userId = 1;

    await notificationController.getNotificationsByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to fetch user notifications.",
    });
  });

  it("should delete notification and return 200 if deleted", async () => {
    vi.spyOn(notificationService, "deleteNotification").mockResolvedValue(true);
    req.params.id = 1;

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Notification deleted successfully.",
    });
    expect(notificationService.deleteNotification).toHaveBeenCalledWith(1);
  });

  it("should return 404 if delete notification returns false", async () => {
    vi.spyOn(notificationService, "deleteNotification").mockResolvedValue(
      false
    );
    req.params.id = 1;

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Notification not found.",
    });
  });

  it("should handle error on delete notification", async () => {
    vi.spyOn(notificationService, "deleteNotification").mockRejectedValue(
      new Error("fail")
    );
    req.params.id = 1;

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to delete notification.",
    });
  });

  it("should update notification and return 200 if updated", async () => {
    vi.spyOn(notificationService, "updateNotification").mockResolvedValue(true);
    req.params.id = 1;
    req.body = { read: true };

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Notification updated successfully.",
    });
    expect(notificationService.updateNotification).toHaveBeenCalledWith(1, {
      read: true,
    });
  });

  it("should return 404 if update notification returns false", async () => {
    vi.spyOn(notificationService, "updateNotification").mockResolvedValue(
      false
    );
    req.params.id = 1;
    req.body = { read: true };

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Notification not found.",
    });
  });

  it("should handle error on update notification", async () => {
    vi.spyOn(notificationService, "updateNotification").mockRejectedValue(
      new Error("fail")
    );
    req.params.id = 1;
    req.body = { read: true };

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to update notification.",
    });
  });
});
