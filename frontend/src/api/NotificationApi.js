import api from "./AxiosInstance";

export const fetchUserNotifications = async (userId) => {
  try {
    const res = await api.get(`/notifications/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Fetch notifications error:", err.response?.data || err.message);
    throw err;
  }
};

export const fetchNotificationById = async (id) => {
  try {
    const res = await api.get(`/notifications/${id}`);
    return res.data;
  } catch (err) {
    console.error("Fetch notification by ID error:", err.response?.data || err.message);
    throw err;
  }
};

export const createNotification = async (data) => {
  try {
    const res = await api.post("/notifications", data);
    return res.data;
  } catch (err) {
    console.error("Create notification error:", err.response?.data || err.message);
    throw err;
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete notification error:", err.response?.data || err.message);
    throw err;
  }
};

export const updateNotification = async (id, data) => {
  try {
    const res = await api.patch(`/notifications/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Update notification error:", err.response?.data || err.message);
    throw err;
  }
};

// export const fetchNotificationsByDate = async (date) => {
//   try {
//     const res = await api.get(`/notifications/date/${date}`);
//     return res.data;
//   } catch (err) {
//     console.error("Fetch notifications by date error:", err.response?.data || err.message);
//     throw err;
//   }
// };
