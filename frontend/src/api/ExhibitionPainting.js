import api from "./AxiosInstance";

export const getPaintingsByExhibition = async (exhibitionId) => {
  try {
    const response = await api.get(`/exhibitionpainting/${exhibitionId}/paintings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paintings:", error.response?.data || error.message);
    throw error;
  }
};

export const getExhibitionsByPainting = async (paintingId) => {
  try {
    const response = await api.get(`/exhibitionpainting/${paintingId}/exhibitions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exhibitions:", error.response?.data || error.message);
    throw error;
  }
}

export const createExhibitionPainting = async (exhibitionId, paintingId) => {
  try {
    const response = await api.post(`/exhibitionpainting/`, {
      exhibition_id: exhibitionId,
      painting_id: paintingId
    });
    return response.data;
  } catch (error) {
    console.error("Error creating painting:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteExhibitionPainting = async (exhibitionId, paintingId) => {
  try {
    const response = await api.delete(`/exhibitionpainting/`, {
      data: {
        exhibition_id: exhibitionId,
        painting_id: paintingId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting painting:", error.response?.data || error.message);
    throw error;
  }
};

export const getFirstPaintingByExhibition = async (exhibitionId) => {
  try {
      const response = await api.get(`/exhibition-paintings/${exhibitionId}/first-painting`);
      return response.data;
  } catch (error) {
      console.error("Error fetching first painting:", error.response?.data || error.message);
      throw error;
  }
};