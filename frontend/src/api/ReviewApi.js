import api from "./AxiosInstance";

export const getAllReviews = async (filters = {}) => {
  try {
    const res = await api.get(`/reviews`, { params: filters });
    console.log("Reviews data:", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    throw err;
  }
};

export const getReviewById = async (id) => {
  try {
    const res = await api.get(`/reviews/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching review ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getExhibitionReviews = async (exhibitionId) => {
  try {
    const res = await api.get(`/reviews`, {
      params: { exhibitionId },
    });
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching reviews for exhibition ${exhibitionId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getUserReviews = async (userId) => {
  try {
    const res = await api.get(`/reviews`, {
      params: { userId },
    });
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching reviews for user ${userId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getExhibitionAverageRating = async (exhibitionId) => {
  try {
    const res = await api.get(`/reviews/exhibition/${exhibitionId}/rating`);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching average rating for exhibition ${exhibitionId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const createReview = async (data) => {
  try {
    const res = await api.post(`/reviews`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Review created:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error creating review:", err.response?.data || err.message);
    throw err;
  }
};

export const updateReview = async (id, data) => {
  try {
    const res = await api.put(`/reviews/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error(
      `Error updating review ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteReview = async (id) => {
  try {
    const res = await api.delete(`/reviews/${id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error(
      `Error deleting review ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};
