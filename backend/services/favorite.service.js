import Favorite from "../models/favorite.model.js";
import FavoriteResponseDTO from "../dto/favorite/responses/FavoriteResponseDTO.js";
import {
  validateFavoriteData,
  validateFavoriteExists,
  validateFavoriteFilters,
} from "../errors/FavoriteValidationError.js";
import logger from "../utils/logger.js";

async function createFavorite(favoriteDto) {
  logger.debug("Validating favorite data", { data: favoriteDto });
  const validatedData = validateFavoriteData(favoriteDto);
  logger.debug("Creating new favorite in database");
  const newFavorite = await Favorite.create(validatedData);
  logger.info("New favorite created", {
    favoriteId: newFavorite.id,
    paintingId: newFavorite.painting_id,
    userId: newFavorite.user_id,
  });
  return new FavoriteResponseDTO(newFavorite);
}

async function getAllFavorites() {
  logger.debug("Fetching all favorites from database");
  const favorites = await Favorite.findAll();
  logger.info("Retrieved all favorites", { count: favorites.length });
  return favorites.map((favorite) => new FavoriteResponseDTO(favorite));
}

async function getFavoritesByUserId(userId) {
  logger.debug("Validating userId for favorites", { userId });
  const { userId: validatedUserId } = validateFavoriteFilters({ userId });
  logger.debug("Fetching favorites by userId", { userId: validatedUserId });
  const favorites = await Favorite.findAll({
    where: { user_id: validatedUserId },
  });
  logger.info("Retrieved favorites for user", {
    userId: validatedUserId,
    count: favorites.length,
  });
  return favorites.map((favorite) => new FavoriteResponseDTO(favorite));
}

async function getFavoriteById(id) {
  logger.debug("Fetching favorite by ID", { id });
  const favorite = await Favorite.findByPk(id);
  validateFavoriteExists(favorite);
  logger.info("Retrieved favorite", { id: favorite.id });
  return new FavoriteResponseDTO(favorite);
}

async function checkFavoriteExists(paintingId, userId) {
  logger.debug("Checking if favorite exists", { paintingId, userId });
  const validatedData = validateFavoriteData({
    painting_id: paintingId,
    user_id: userId,
  });
  const favorite = await Favorite.findOne({
    where: {
      painting_id: validatedData.painting_id,
      user_id: validatedData.user_id,
    },
  });
  logger.info("Favorite existence checked", {
    paintingId: validatedData.painting_id,
    userId: validatedData.user_id,
    exists: !!favorite,
  });
  return !!favorite;
}

async function deleteFavorite(id) {
  logger.debug("Attempting to delete favorite", { id });
  const favorite = await Favorite.findByPk(id);
  validateFavoriteExists(favorite);
  const result = await Favorite.destroy({ where: { id: id } });
  logger.info("Favorite deleted", { id });
  return result;
}

async function deleteFavoriteByPaintingAndUser(paintingId, userId) {
  logger.debug("Attempting to delete favorite by painting and user", {
    paintingId,
    userId,
  });
  const validatedData = validateFavoriteData({
    painting_id: paintingId,
    user_id: userId,
  });
  const favorite = await Favorite.findOne({
    where: {
      painting_id: validatedData.painting_id,
      user_id: validatedData.user_id,
    },
  });
  validateFavoriteExists(favorite);
  const result = await Favorite.destroy({
    where: {
      painting_id: validatedData.painting_id,
      user_id: validatedData.user_id,
    },
  });
  logger.info("Favorite deleted by painting and user", {
    paintingId: validatedData.painting_id,
    userId: validatedData.user_id,
  });
  return result;
}

export {
  createFavorite,
  getAllFavorites,
  getFavoritesByUserId,
  getFavoriteById,
  checkFavoriteExists,
  deleteFavorite,
  deleteFavoriteByPaintingAndUser,
};
