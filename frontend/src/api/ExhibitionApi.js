import api from "./AxiosInstance";

export const getAllExhibitions = async (filters = {}) => {
  try {
    const res = await api.get(`/exhibitions`, { params: filters });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch exhibitions:", err);
    throw err;
  }
};

export const getExhibitionsByTimeframe = async () => {
  try {
    const res = await api.get(`/exhibitions/timeframe`);
    console.log("Timeframe response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch exhibitions by timeframe:", err);
    throw err;
  }
};

export const getExhibitionById = async (id) => {
  try {
    const res = await api.get(`/exhibitions/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching exhibition ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const createExhibition = async (data) => {
  try {
    const res = await api.post(`/exhibitions`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error(
      "Error creating exhibition:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const updateExhibition = async (id, data) => {
  try {
    const res = await api.put(`/exhibitions/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Exhibition updated:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      `Error updating exhibition ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteExhibition = async (id) => {
  try {
    const res = await api.delete(`/exhibitions/${id}`, {
      withCredentials: true,
    });
    console.log("Exhibition deleted:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      `Error deleting exhibition ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};
