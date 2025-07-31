import axiosInstance from "./AxiosInstance";

const PAINTINGS_ENDPOINT = "/paintings";

export const getAllPaintings = async (page = 1, size = 100) => {
  try {
    const res = await axiosInstance.get(PAINTINGS_ENDPOINT, {
      params: { page, size },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch paintings:", err);
    throw err;
  }
};

export const getPaintingById = async (id) => {
  try {
    const res = await axiosInstance.get(`${PAINTINGS_ENDPOINT}/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching painting with id ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const createPainting = (paintingData) => {
  return axiosInstance.post(PAINTINGS_ENDPOINT, paintingData);
};

export const getPaintingsByProvenance = async () => {
  try {
    const paintings = await getAllPaintings();
    const provenanceCounts = paintings.reduce((acc, painting) => {
      const provenance = painting.provenance || "Unknown";
      acc[provenance] = (acc[provenance] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(provenanceCounts).map(([status, count]) => ({
      status,
      count,
    }));
  } catch (err) {
    console.error("Failed to fetch paintings by provenance:", err);
    throw err;
  }
};

export const updatePainting = async (id, data) => {
  try {
    const res = await axiosInstance.put(`${PAINTINGS_ENDPOINT}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(
      `Error updating painting with id ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};
