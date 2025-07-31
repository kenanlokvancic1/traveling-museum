import MuseumService from "../services/museum.service.js";
import MuseumCreateRequestDto from "../dto/museum/requests/MuseumCreateRequestDto.js";
import MuseumResponseDto from "../dto/museum/responses/MuseumResponseDto.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFoundError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const createMuseum = errorHandler(async (req, res) => {
  logger.info("Create museum request received", { body: req.body });
  const createDto = new MuseumCreateRequestDto(req.body);
  const newMuseum = await MuseumService.createMuseum(createDto);
  logger.info("Museum created successfully", { id: newMuseum.id });
  return res.status(201).json(new MuseumResponseDto(newMuseum));
});

export const getAllMuseums = errorHandler(async (req, res) => {
  logger.info("Get all museums request received");
  const museums = await MuseumService.getAllMuseums();
  logger.info("All museums retrieved", { count: museums.length });
  return res.status(200).json(museums);
});

export const getMuseumById = errorHandler(async (req, res) => {
  logger.info("Get museum by ID request received", { id: req.params.id });
  const { id } = req.params;
  const museum = await MuseumService.getMuseumById(id);
  if (!museum) {
    logger.warn("Museum not found", { id });
    throw new NotFoundError("Museum not found");
  }
  logger.info("Museum retrieved", { id });
  return res.status(200).json(museum);
});

export const updateMuseum = errorHandler(async (req, res) => {
  logger.info("Update museum request received", {
    id: req.params.id,
    body: req.body,
  });
  const { id } = req.params;
  const updatedMuseum = await MuseumService.updateMuseum(id, req.body);
  if (!updatedMuseum) {
    logger.warn("Museum not found for update", { id });
    throw new NotFoundError("Museum not found");
  }
  logger.info("Museum updated successfully", { id });
  return res.status(200).json(updatedMuseum);
});

export const deleteMuseum = errorHandler(async (req, res) => {
  logger.info("Delete museum request received", { id: req.params.id });
  const { id } = req.params;
  const deleted = await MuseumService.deleteMuseum(id);
  if (!deleted) {
    logger.warn("Museum not found for deletion", { id });
    throw new NotFoundError("Museum not found");
  }
  logger.info("Museum deleted successfully", { id });
  return res.status(204).send();
});
