import PaintingCreateRequestDTO from "../dto/painting/requests/PaintingCreateRequestDTO.js";
import PaintingUpdateRequestDTO from "../dto/painting/requests/PaintingUpdateRequestDTO.js";
import * as paintingService from "../services/painting.service.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFoundError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const createPainting = errorHandler(async (req, res) => {
  logger.info("Creating new painting", {
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
  });
  const dto = new PaintingCreateRequestDTO(req.body);
  const result = await paintingService.createPainting(dto);
  logger.info("Painting created successfully", { paintingId: result.id });
  res.status(201).json(result);
});

export const getAllPaintings = errorHandler(async (req, res) => {
  logger.info("Fetching all paintings");
  const result = await paintingService.getAllPaintings();
  logger.debug(`Retrieved ${result.length} paintings`);
  res.status(200).json(result);
});

export const getPaintingById = errorHandler(async (req, res) => {
  logger.info("Fetching painting by id", { id: req.params.id });
  const result = await paintingService.getPaintingById(req.params.id);
  if (!result) {
    logger.warn("Painting not found", { id: req.params.id });
    throw new NotFoundError("Painting not found");
  }
  logger.debug("Painting retrieved successfully", { id: req.params.id });
  res.status(200).json(result);
});

export const updatePainting = errorHandler(async (req, res) => {
  logger.info("Updating painting", {
    id: req.params.id,
    updateData: req.body,
  });
  const dto = new PaintingUpdateRequestDTO(req.body);
  const result = await paintingService.updatePainting(req.params.id, dto);
  if (!result) {
    logger.warn("Painting not found for update", { id: req.params.id });
    throw new NotFoundError("Painting not found");
  }
  logger.info("Painting updated successfully", { id: req.params.id });
  res.status(200).json(result);
});

export const deletePainting = errorHandler(async (req, res) => {
  logger.info("Deleting painting", { id: req.params.id });
  const result = await paintingService.deletePainting(req.params.id);
  if (!result) {
    logger.warn("Painting not found for deletion", { id: req.params.id });
    throw new NotFoundError("Painting not found");
  }
  logger.info("Painting deleted successfully", { id: req.params.id });
  res.status(204).send();
});
