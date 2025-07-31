import api from "./AxiosInstance";

export const registerUser = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err) {
    console.error("Register error:", err.response?.data || err.message);
    throw err;
  }
};

export const loginUser = async ({ email, password, rememberMe }) => {
  try {
    const res = await api.post("/auth/login", { email, password, rememberMe });
    return res.data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.get("/auth/logout");
    return res.data;
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err;
  }
};

export const sendVerificationCode = async (email) => {
  try {
    const res = await api.post("/auth/verify/send", {
      email,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const verifyCode = async (email, code) => {
  try {
    const res = await api.post("/auth/verify/check", { email, code });
    return res.data;
  } catch (err) {
    console.error("Verify code error:", err.response?.data || err.message);
    throw err;
  }
};

export const changePassword = async (data) => {
  try {
    const res = await api.post("/auth/change-password", data);
    return res.data;
  } catch (err) {
    console.error("Change password error:", err.response?.data || err.message);
    throw err;
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  } catch (err) {
    console.error("Forgot password error:", err.response?.data || err.message);
    throw err;
  }
};

export const resetPassword = async (token, data) => {
  try {
    const res = await api.post(`/auth/reset-password/${token}`, data);
    return res.data;
  } catch (err) {
    console.error("Reset password error:", err.response?.data || err.message);
    throw err;
  }
};

export const verifyPassword = async (data) => {
  try {
    const res = await api.post("/auth/verify-password", data);
    return res.data;
  } catch (err) {
    console.error("Verify password error:", err.response?.data || err.message);
    throw err;
  }
};