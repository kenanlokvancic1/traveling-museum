import Exhibition from "../models/exhibition.model.js";
import Painting from "../models/painting.model.js";
import Exhibition_Painting from "../models/exhibition_painting.model.js";
import ExhibitionPaintingResponseDTO from "../dto/exhibitionPainting/responses/ExhibitionPaintingResponseDTO.js";
import {
  validateExhibitionPaintingData,
  validateExhibitionExists,
  validatePaintingExists,
  validateExhibitionNotFinished,
  validateNoPaintingOverlap,
} from "../errors/ExhibitionPaintingValidationError.js";
import logger from "../utils/logger.js";

async function findExhibitionOrThrow(id) {
  logger.debug("Finding exhibition by ID", { id });
  const exhibition = await Exhibition.findByPk(id);
  if (!exhibition) {
    logger.error("Exhibition not found", { id });
    throw new Error("Exhibition not found");
  }
  return exhibition;
}

async function findPaintingOrThrow(id) {
  logger.debug("Finding painting by ID", { id });
  const painting = await Painting.findByPk(id);
  if (!painting) {
    logger.error("Painting not found", { id });
    throw new Error("Painting not found");
  }
  return painting;
}

export async function createExhibitionPainting(dto) {
  logger.debug("Validating exhibition painting data", { data: dto });
  const validatedData = validateExhibitionPaintingData(dto);

  logger.debug("Checking exhibition existence and status", {
    exhibition_id: validatedData.exhibition_id,
  });
  const exhibition = await Exhibition.findByPk(validatedData.exhibition_id);
  validateExhibitionExists(exhibition);
  validateExhibitionNotFinished(exhibition);

  logger.debug("Checking painting existence", {
    painting_id: validatedData.painting_id,
  });
  const painting = await Painting.findByPk(validatedData.painting_id);
  validatePaintingExists(painting);

  logger.debug("Validating no painting overlap", {
    exhibition_id: validatedData.exhibition_id,
    painting_id: validatedData.painting_id,
  });
  await validateNoPaintingOverlap(
    exhibition,
    validatedData.painting_id,
    Exhibition_Painting,
    Exhibition
  );

  logger.debug("Creating exhibition painting record", { validatedData });
  const record = await Exhibition_Painting.create(validatedData);
  logger.info("Exhibition painting created", {
    exhibition_id: record.exhibition_id,
    painting_id: record.painting_id,
  });
  return new ExhibitionPaintingResponseDTO(record);
}

export async function deleteExhibitionPainting(dto) {
  logger.debug("Validating exhibition painting data for deletion", {
    data: dto,
  });
  const validatedData = validateExhibitionPaintingData(dto);

  logger.debug("Checking exhibition existence and status for deletion", {
    exhibition_id: validatedData.exhibition_id,
  });
  const exhibition = await Exhibition.findByPk(validatedData.exhibition_id);
  validateExhibitionExists(exhibition);
  validateExhibitionNotFinished(exhibition);

  logger.debug("Deleting exhibition painting connection", {
    exhibition_id: validatedData.exhibition_id,
    painting_id: validatedData.painting_id,
  });
  const count = await Exhibition_Painting.destroy({
    where: {
      exhibition_id: validatedData.exhibition_id,
      painting_id: validatedData.painting_id,
    },
  });

  if (count === 0) {
    logger.warn("Exhibition painting connection not found for deletion", {
      exhibition_id: validatedData.exhibition_id,
      painting_id: validatedData.painting_id,
    });
    throw new NotFoundError("Exhibition painting connection not found");
  }

  logger.info("Exhibition painting connection deleted", {
    exhibition_id: validatedData.exhibition_id,
    painting_id: validatedData.painting_id,
  });
  return count;
}

export async function listPaintingsByExhibition(exhibitionId) {
  logger.debug("Listing paintings by exhibition", { exhibitionId });
  if (!Number.isInteger(Number(exhibitionId))) {
    logger.warn("Invalid exhibition ID format", { exhibitionId });
    throw new ValidationError("Invalid exhibition ID format");
  }

  const exhibition = await Exhibition.findByPk(exhibitionId);
  validateExhibitionExists(exhibition);

  const rows = await Exhibition_Painting.findAll({
    where: { exhibition_id: exhibitionId },
    include: [{ model: Painting }],
  });

  logger.info("Paintings listed for exhibition", {
    exhibitionId,
    count: rows.length,
  });
  return rows.map((r) => r.Painting);
}

export async function getFirstPaintingByExhibition(exhibitionId) {
  logger.debug("Getting first painting by exhibition", { exhibitionId });
  if (!Number.isInteger(Number(exhibitionId))) {
    logger.warn("Invalid exhibition ID format", { exhibitionId });
    throw new ValidationError("Invalid exhibition ID format");
  }

  const exhibition = await Exhibition.findByPk(exhibitionId);
  validateExhibitionExists(exhibition);

  const row = await Exhibition_Painting.findOne({
    where: { exhibition_id: exhibitionId },
    include: [{ model: Painting }],
    order: [["painting_id", "ASC"]],
  });

  logger.info("First painting fetched for exhibition", {
    exhibitionId,
    found: !!row,
  });
  return row ? row.Painting : null;
}

export async function listExhibitionsByPainting(paintingId) {
  logger.debug("Listing exhibitions by painting", { paintingId });
  if (!Number.isInteger(Number(paintingId))) {
    logger.warn("Invalid painting ID format", { paintingId });
    throw new ValidationError("Invalid painting ID format");
  }

  const painting = await Painting.findByPk(paintingId);
  validatePaintingExists(painting);

  const rows = await Exhibition_Painting.findAll({
    where: { painting_id: paintingId },
    include: [{ model: Exhibition }],
  });

  logger.info("Exhibitions listed for painting", {
    paintingId,
    count: rows.length,
  });
  return rows.map((r) => new ExhibitionPaintingResponseDTO(r));
}
