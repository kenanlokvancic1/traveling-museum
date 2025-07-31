import Painting from "../models/painting.model.js";
import PaintingResponseDTO from "../dto/painting/responses/PaintingResponseDTO.js";
import Exhibition_Painting from "../models/exhibition_painting.model.js";
import {
  validatePaintingData,
  validatePaintingExists,
} from "../errors/PaintingValidationError.js";
import logger from "../utils/logger.js";

async function createPainting(paintingDto) {
  logger.debug("Validating painting data", { data: paintingDto });
  const validatedData = validatePaintingData(paintingDto);

  logger.debug("Creating new painting in database");
  const newPainting = await Painting.create(validatedData);
  logger.info("New painting created", {
    paintingId: newPainting.painting_id,
    title: newPainting.title,
  });

  return new PaintingResponseDTO(newPainting);
}

async function getAllPaintings() {
  logger.debug("Fetching all paintings from database");
  const paintings = await Painting.findAll();
  logger.info("Retrieved all paintings", { count: paintings.length });
  return paintings.map((painting) => new PaintingResponseDTO(painting));
}

async function getPaintingById(id) {
  logger.debug("Fetching painting by ID", { id });
  const painting = await Painting.findByPk(id);
  validatePaintingExists(painting);
  logger.info("Retrieved painting", {
    id: painting.painting_id,
    title: painting.title,
  });
  return new PaintingResponseDTO(painting);
}

async function updatePainting(id, paintingDto) {
  logger.debug("Updating painting", { id, updateData: paintingDto });
  const validatedData = validatePaintingData(paintingDto);

  await Painting.update(validatedData, { where: { painting_id: id } });
  const updated = await Painting.findByPk(id);
  validatePaintingExists(updated);

  logger.info("Painting updated successfully", {
    id: updated.painting_id,
    title: updated.title,
  });
  return new PaintingResponseDTO(updated);
}

async function deletePainting(id) {
  logger.debug("Attempting to delete painting", { id });
  const painting = await Painting.findByPk(id);
  validatePaintingExists(painting);

  const result = await Painting.destroy({ where: { painting_id: id } });
  logger.info("Painting deleted successfully", {
    id,
    title: painting.title,
  });
  return result;
}

async function getFirstPaintingByExhibitionId(exhibitionId) {
  const entry = await Exhibition_Painting.findOne({
    where: { exhibition_id: exhibitionId },
    order: [["painting_id", "ASC"]],
  });

  if (!entry) return null;

  const painting = await Painting.findByPk(entry.painting_id);
  return painting ? new PaintingResponseDTO(painting) : null;
}

export {
  createPainting,
  getAllPaintings,
  updatePainting,
  deletePainting,
  getPaintingById,
  getFirstPaintingByExhibitionId,
};
