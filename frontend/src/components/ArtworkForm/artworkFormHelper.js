import { getAllArtists } from "../../api/ArtistApi";
import { createPainting } from "../../api/PaintingApi";

export const fetchArtists = async () => {
  try {
    const artists = await getAllArtists();
    return artists;
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
};

export const fetchMuseums = async () => {
  try {
    const response = await api.get("/museums");
    const museums = Array.isArray(response.data)
      ? response.data
      : response.data.museums || [];
    return museums.map((museum) => ({
      id: museum.id || museum._id,
      name: museum.name,
    }));
  } catch (error) {
    console.error("Error fetching museums:", error);
    return [];
  }
};

export const submitArtworkForm = async (formData) => {
  try {
    const submissionData = {
      title: formData.title,
      artist_id: formData.artist,
      year: formData.year,
      medium: formData.medium || null,
      dimensions: formData.dimensions || null,
      image_url: formData.imageUrl || null,
      description: formData.description || null,
      location: formData.location || null,
      provenance: formData.period || null, 
      shares: 0,
    };

    const response = await createPainting(submissionData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create artwork",
    };
  }
};
