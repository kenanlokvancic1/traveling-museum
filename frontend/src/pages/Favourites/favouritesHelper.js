import { getFavoritesByUserId } from "../../api/FavoriteApi";
import { getPaintingById } from "../../api/PaintingApi";

export const getUserFavorites = async (userId) => {
  if (!userId) {
    console.error("No user ID provided to getUserFavorites");
    return [];
  }

  try {
    console.log("Fetching favorites for user ID:", userId);
    const favorites = await getFavoritesByUserId(userId);
    console.log("Received favorites:", favorites);

    if (!favorites || favorites.length === 0) {
      console.log("No favorites found for user");
      return [];
    }

    const paintingsPromises = favorites.map(async (favorite) => {
      try {
        console.log("Fetching painting:", favorite.painting_id);
        const painting = await getPaintingById(favorite.painting_id);
        return painting;
      } catch (error) {
        console.error(
          `Error fetching painting ${favorite.painting_id}:`,
          error
        );
        return null;
      }
    });

    const paintings = await Promise.all(paintingsPromises);
    const filteredPaintings = paintings.filter((painting) => painting !== null);
    console.log("Filtered paintings:", filteredPaintings);
    return filteredPaintings;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return [];
  }
};
