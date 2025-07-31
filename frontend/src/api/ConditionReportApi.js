import api from "./AxiosInstance";

export const getAllConditionReports = async (filters = {}) => {
  try {
    const res = await api.get(`/condition-reports`, { params: filters });
    console.log("Condition reports data:", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch condition reports:", err);
    throw err;
  }
};

export const getConditionReportById = async (id) => {
  try {
    const res = await api.get(`/condition-reports/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching condition report ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const createConditionReport = async (data) => {
  try {
    const res = await api.post(`/condition-reports`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Condition report created:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "Error creating condition report:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const updateConditionReport = async (id, data) => {
  try {
    const res = await api.patch(`/condition-reports/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Condition report updated:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      `Error updating condition report ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteConditionReport = async (id) => {
  try {
    const res = await api.delete(`/condition-reports/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      withCredentials: true,
    });
    console.log("Condition report deleted:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      `Error deleting condition report ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getReportsByPaintingId = async (paintingId) => {
  try {
    const res = await api.get(`/condition-reports/painting/${paintingId}`, {
        withCredentials: true,
    });
    console.log("Painting condition reports:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching condition reports for painting ${paintingId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};