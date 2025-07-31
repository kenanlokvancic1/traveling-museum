import api from "./AxiosInstance";

export const getMyProfile = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (err) {
    console.error("Get my profile error:", err.response?.data || err.message);
    throw err;
  }
};

export const updateMyProfile = async (data) => {
  try {
    const res = await api.patch("/users/me", data);
    return res.data;
  } catch (err) {
    console.error("Update my profile error:", err.response?.data || err.message);
    throw err;
  }
};

export const deleteMyAccount = async () => {
  try {
    const res = await api.delete("/users/me");
    return res.data;
  } catch (err) {
    console.error("Delete account error:", err.response?.data || err.message);
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    console.error("Get all users error:", err.response?.data || err.message);
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get user by ID error:", err.response?.data || err.message);
    throw err;
  }
};

export const updateUserByAdmin = async (id, data) => {
  try {
    const res = await api.patch(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Admin update user error:", err.response?.data || err.message);
    throw err;
  }
};

export const deleteUserByAdmin = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("Admin delete user error:", err.response?.data || err.message);
    throw err;
  }
};
