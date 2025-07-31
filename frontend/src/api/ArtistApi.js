import api from "./AxiosInstance";
import { getPaintingsByExhibition } from "./ExhibitionPainting";

export const getAllArtists = async (page = 1, size = 10) => {
  try {
    const res = await api.get(`/artists`);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch artists:", err);
    throw err;
  }
};

export const getArtistById = async (id) => {
  try {
    const res = await api.get(`/artists/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      `Error fetching artist ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const createArtist = async (data) => {
  try {
    const res = await api.post("/artists", data);
    return res.data;
  } catch (err) {
    console.error("Error creating artist:", err.response?.data || err.message);
    throw err;
  }
};

export const updateArtist = async (id, data) => {
  try {
    const res = await api.put(`/artists/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(
      `Error updating artist ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteArtist = async (id) => {
  try {
    const res = await api.delete(`/artists/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      `Error deleting artist ${id}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getTopArtists = async () => {
  try {
    const artists = await getAllArtists();
    const paintings = await api.get("/paintings");

    const artistStats = await Promise.all(
      artists.map(async (artist) => {
        const artistPaintings = paintings.data.filter(
          (p) => p.artist_id === artist.artist_id
        );
        let exhibitionCount = 0;

        for (const painting of artistPaintings) {
          try {
            const exhibitions = await getPaintingsByExhibition(
              painting.painting_id
            );
            exhibitionCount += exhibitions.length;
          } catch (error) {
            console.warn(
              `Could not fetch exhibitions for painting ${painting.painting_id}:`,
              error
            );
          }
        }

        return {
          ...artist,
          exhibitionPaintingsCount: exhibitionCount,
        };
      })
    );

    return artistStats
      .sort((a, b) => b.exhibitionPaintingsCount - a.exhibitionPaintingsCount)
      .slice(0, 3);
  } catch (err) {
    console.error("Failed to fetch top artists:", err);
    throw err;
  }
};
