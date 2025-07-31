import ArtistCreateRequestDTO from "../dto/artist/requests/ArtistCreateRequestDTO.js";
import ArtistUpdateRequestDTO from "../dto/artist/requests/ArtistUpdateRequestDTO.js";
import * as artistService from "../services/artist.service.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFoundError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const createArtist = errorHandler(async (req, res) => {
  logger.info("Create artist request received", { body: req.body });
  const dto = new ArtistCreateRequestDTO(req.body);
  const result = await artistService.createArtist(dto);
  logger.info("Artist created successfully", {
    id: result.artist_id || result.id,
  });
  res.status(201).json(result);
});

export const getAllArtists = errorHandler(async (req, res) => {
  logger.info("Get all artists request received");
  const result = await artistService.getAllArtists();
  logger.info("All artists retrieved", { count: result.length });
  res.status(200).json(result);
});

export const updateArtist = errorHandler(async (req, res) => {
  logger.info("Update artist request received", {
    id: req.params.id,
    body: req.body,
  });
  const dto = new ArtistUpdateRequestDTO(req.body);
  const result = await artistService.updateArtist(req.params.id, dto);
  if (!result) {
    logger.warn("Artist not found for update", { id: req.params.id });
    throw new NotFoundError("Artist not found");
  }
  logger.info("Artist updated successfully", { id: req.params.id });
  res.status(200).json(result);
});

export const deleteArtist = errorHandler(async (req, res) => {
  logger.info("Delete artist request received", { id: req.params.id });
  const result = await artistService.deleteArtist(req.params.id);
  if (!result) {
    logger.warn("Artist not found for deletion", { id: req.params.id });
    throw new NotFoundError("Artist not found");
  }
  logger.info("Artist deleted successfully", { id: req.params.id });
  res.status(204).send();
});

export const getArtistById = errorHandler(async (req, res) => {
  logger.info("Get artist by ID request received", { id: req.params.id });
  const result = await artistService.getArtistById(req.params.id);
  if (!result) {
    logger.warn("Artist not found", { id: req.params.id });
    throw new NotFoundError("Artist not found");
  }
  logger.info("Artist retrieved successfully", { id: req.params.id });
  res.status(200).json(result);
});
