import { getPaintingById } from "../../api/PaintingApi";
import { getArtistById } from "../../api/ArtistApi";

export const fetchArtworkDetails = async (id) => {
  try {
    const artworkData = await getPaintingById(id);

    let artistData = null;
    if (artworkData.artist_id) {
      try {
        artistData = await getArtistById(artworkData.artist_id);
      } catch (artistError) {
        console.error("Failed to fetch artist data:", artistError);
      }
    }

    return { ...artworkData, artist: artistData };
  } catch (error) {
    console.error("Error fetching artwork details:", error);
    throw error;
  }
};
