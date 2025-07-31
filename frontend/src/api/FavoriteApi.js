import api from "./AxiosInstance";

export const createFavorite = async (data) => {
  try {
    if (!data.user_id) {
      console.error("Error: user_id is missing from favorite data", data);
      throw new Error("user_id is required to create a favorite");
    }

    const res = await api.post(`/favorites`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(
      "Error creating favorite:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getAllFavorites = async () => {
  try {
    const res = await api.get(`/favorites`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch favorites:", err);
    throw err;
  }
};

export const getFavoriteById = async (id) => {
  try {
    const res = await api.get(`/favorites/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching favorite ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getFavoritesByUserId = async (userId) => {
  try {
    console.log(`Requesting favorites for user ID: ${userId}`);
    const res = await api.get(`/favorites/user/${userId}`);
    console.log("Response from getFavoritesByUserId:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching favorites for user ${userId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const checkFavorite = async (paintingId, userId) => {
  try {
    const res = await api.get(`/favorites/check/${paintingId}/${userId}`);
    return res.data;
  } catch (err) {
    console.error(
      `Error checking favorite status for painting ${paintingId} and user ${userId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteFavorite = async (id) => {
  try {
    const res = await api.delete(`/favorites/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(
      `Error deleting favorite ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteFavoriteByPaintingAndUser = async (paintingId, userId) => {
  try {
    const res = await api.delete(`/favorites/${paintingId}/${userId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(
      `Error deleting favorite for painting ${paintingId} and user ${userId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};
