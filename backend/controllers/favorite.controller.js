import FavoriteCreateRequestDTO from "../dto/favorite/requests/FavoriteCreateRequestDTO.js";
import * as favoriteService from "../services/favorite.service.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFoundError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const createFavorite = errorHandler(async (req, res) => {
  logger.info("Create favorite request received", { body: req.body });
  const dto = new FavoriteCreateRequestDTO(req.body);
  const result = await favoriteService.createFavorite(dto);
  logger.info("Favorite created successfully", {
    id: result.favoriteId || result.id,
  });
  res.status(201).json(result);
});

export const getAllFavorites = errorHandler(async (req, res) => {
  logger.info("Get all favorites request received");
  const result = await favoriteService.getAllFavorites();
  logger.info("All favorites retrieved", { count: result.length });
  res.status(200).json(result);
});

export const getFavoritesByUserId = errorHandler(async (req, res) => {
  logger.info("Get favorites by user ID request received", {
    userId: req.params.userId,
  });
  const result = await favoriteService.getFavoritesByUserId(req.params.userId);
  if (!result || result.length === 0) {
    logger.warn("No favorites found for user", { userId: req.params.userId });
    throw new NotFoundError("No favorites found for this user");
  }
  logger.info("Favorites retrieved for user", {
    userId: req.params.userId,
    count: result.length,
  });
  res.status(200).json(result);
});

export const getFavoriteById = errorHandler(async (req, res) => {
  logger.info("Get favorite by ID request received", { id: req.params.id });
  const result = await favoriteService.getFavoriteById(req.params.id);
  if (!result) {
    logger.warn("Favorite not found", { id: req.params.id });
    throw new NotFoundError("Favorite not found");
  }
  logger.info("Favorite retrieved", { id: req.params.id });
  res.status(200).json(result);
});

export const checkFavorite = errorHandler(async (req, res) => {
  logger.info("Check favorite existence request received", {
    paintingId: req.params.paintingId,
    userId: req.params.userId,
  });
  const { paintingId, userId } = req.params;
  const exists = await favoriteService.checkFavoriteExists(paintingId, userId);
  logger.info("Favorite existence checked", { paintingId, userId, exists });
  res.status(200).json({ exists });
});

export const deleteFavorite = errorHandler(async (req, res) => {
  logger.info("Delete favorite request received", { id: req.params.id });
  const result = await favoriteService.deleteFavorite(req.params.id);
  if (!result) {
    logger.warn("Favorite not found for deletion", { id: req.params.id });
    throw new NotFoundError("Favorite not found");
  }
  logger.info("Favorite deleted successfully", { id: req.params.id });
  res.status(204).send();
});

export const deleteFavoriteByPaintingAndUser = errorHandler(
  async (req, res) => {
    logger.info("Delete favorite by painting and user request received", {
      paintingId: req.params.paintingId,
      userId: req.params.userId,
    });
    const { paintingId, userId } = req.params;
    const result = await favoriteService.deleteFavoriteByPaintingAndUser(
      paintingId,
      userId
    );
    if (!result) {
      logger.warn("Favorite not found for deletion by painting and user", {
        paintingId,
        userId,
      });
      throw new NotFoundError("Favorite not found");
    }
    logger.info("Favorite deleted by painting and user successfully", {
      paintingId,
      userId,
    });
    res.status(204).send();
  }
);
