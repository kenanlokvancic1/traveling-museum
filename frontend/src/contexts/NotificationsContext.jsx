import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as NotificationApi from "../api/NotificationApi";
import WebSocketService from "../WebSocketService.js";

export const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);

  const userId = useSelector((state) => state.user.user?.user_id);

  useEffect(() => {
    if (!user) {
      console.log('[FETCH EFFECT] No user available, clearing notifications.');
      setNotifications([]);
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        console.log(`[FETCH EFFECT] Fetching notifications for user: ${user.user_id}`);
        setLoading(true);
        const fetchedNotifications = await NotificationApi.fetchUserNotifications(user.user_id);
        setNotifications(fetchedNotifications);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

  }, [user]);


  useEffect(() => {
    if (!userId) {
      console.log('[WS EFFECT] No user ID available, skipping WebSocket connection.');
      WebSocketService.disconnect();
      return;
    }

    console.log(`[WS EFFECT] Attempting WebSocket connection for user: ${userId}`);
    WebSocketService.connect(userId);

    const unsubscribe = WebSocketService.subscribe((newNotification) => {
      console.log('[WS EFFECT] New notification received:', newNotification);
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => {
      console.log(`[WS CLEANUP] Disconnecting WebSocket for user: ${userId}`);
      unsubscribe();
      WebSocketService.disconnect();
    };
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    if (!id) {
      console.error("Invalid notification ID");
      return;
    }

    try {
      setNotifications((prev) =>
        prev.map((notif) => (notif.notification_id === id ? { ...notif, read: true } : notif))
      );

      await NotificationApi.updateNotification(id, { read: true });
    } catch (err) {
      setNotifications((prev) =>
        prev.map((notif) => (notif.notification_id === id ? { ...notif, read: false } : notif))
      );
      console.error(`Failed to mark notification ${id} as read:`, err);
    }
  };

  const markAsUnread = async (id) => {
    if (!id) {
      console.error("Invalid notification ID");
      return;
    }

    try {
      setNotifications((prev) =>
        prev.map((notif) => (notif.notification_id === id ? { ...notif, read: false } : notif))
      );

      await NotificationApi.updateNotification(id, { read: false });
    } catch (err) {
      setNotifications((prev) =>
        prev.map((notif) => (notif.notification_id === id ? { ...notif, read: true } : notif))
      );
      console.error(`Failed to mark notification ${id} as unread:`, err);
    }
  };

  const deleteNotification = async (id) => {
    if (!id) {
      console.error("Invalid notification ID");
      return;
    }

    try {
      const previousNotifications = [...notifications];
      setNotifications((prev) => prev.filter((notif) => notif.notification_id !== id));

      await NotificationApi.deleteNotification(id);
    } catch (err) {
      setNotifications(previousNotifications);
      console.error(`Failed to delete notification ${id}:`, err);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        loading,
        error,
        unreadCount,
        markAsRead,
        markAsUnread,
        deleteNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};