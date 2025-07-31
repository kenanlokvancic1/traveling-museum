import {
  createExhibitionPainting,
  deleteExhibitionPainting,
  listPaintingsByExhibition,
  listExhibitionsByPainting,
  getFirstPaintingByExhibition,
} from "../services/exhibitionPainting.service.js";
import ExhibitionPaintingRequestDTO from "../dto/exhibitionPainting/requests/ExhibitionPaintingRequestDTO.js";
import errorHandler from "../middleware/errorHandler.js";
import {
  NotFoundError,
  BadRequestError,
  ExhibitionPaintingError,
} from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const create = errorHandler(async (req, res) => {
  logger.info("Create exhibition painting request received", {
    body: req.body,
  });
  try {
    const dto = new ExhibitionPaintingRequestDTO(req.body);
    const result = await createExhibitionPainting(dto);
    logger.info("Exhibition painting created successfully", {
      exhibition_id: result.exhibition_id,
      painting_id: result.painting_id,
    });
    res.status(201).json(result);
  } catch (error) {
    logger.error("Error creating exhibition painting", {
      error: error.message,
    });
    if (error.message.includes("Exhibition not found")) {
      throw ExhibitionPaintingError.exhibitionNotFound();
    }
    if (error.message.includes("Painting not found")) {
      throw ExhibitionPaintingError.paintingNotFound();
    }
    if (
      error.message.includes("Cannot add painting to a finished exhibition")
    ) {
      throw ExhibitionPaintingError.finishedExhibition();
    }
    if (error.message.includes("assigned to an overlapping exhibition")) {
      const titleMatch = error.message.match(/"([^"]+)"/);
      const paintingTitle = titleMatch ? titleMatch[1] : "Unknown painting";
      throw ExhibitionPaintingError.overlappingExhibition(paintingTitle);
    }
    throw error;
  }
});

export const remove = errorHandler(async (req, res) => {
  logger.info("Delete exhibition painting request received", {
    body: req.body,
  });
  const dto = new ExhibitionPaintingRequestDTO(req.body);
  const result = await deleteExhibitionPainting(dto);
  if (!result) {
    logger.warn("Exhibition painting not found for deletion", {
      exhibition_id: dto.exhibition_id,
      painting_id: dto.painting_id,
    });
    throw new NotFoundError("Exhibition painting not found");
  }
  logger.info("Exhibition painting deleted successfully", {
    exhibition_id: dto.exhibition_id,
    painting_id: dto.painting_id,
  });
  res.status(204).send();
});

export const listByExhibition = errorHandler(async (req, res) => {
  logger.info("List paintings by exhibition request received", {
    exhibitionId: req.params.exhibitionId,
  });
  const exhibitionId = Number(req.params.exhibitionId);
  if (Number.isNaN(exhibitionId)) {
    logger.warn("Invalid exhibition ID for listing paintings", {
      exhibitionId: req.params.exhibitionId,
    });
    throw new BadRequestError("Invalid exhibition ID. Must be a number.");
  }

  const list = await listPaintingsByExhibition(exhibitionId);
  logger.info("Paintings listed for exhibition", {
    exhibitionId,
    count: list.length,
  });
  res.status(200).json(list || []);
});

export const firstPaintingByExhibition = errorHandler(async (req, res) => {
  logger.info("Get first painting by exhibition request received", {
    exhibitionId: req.params.exhibitionId,
  });
  const exhibitionId = Number(req.params.exhibitionId);
  if (Number.isNaN(exhibitionId)) {
    logger.warn("Invalid exhibition ID for first painting", {
      exhibitionId: req.params.exhibitionId,
    });
    throw new BadRequestError("Invalid exhibition ID. Must be a number.");
  }

  const painting = await getFirstPaintingByExhibition(exhibitionId);
  if (!painting) {
    logger.warn("No painting found for exhibition", { exhibitionId });
    throw new NotFoundError("No painting found for this exhibition");
  }
  logger.info("First painting fetched for exhibition", { exhibitionId });
  res.status(200).json(painting);
});

export const listByPainting = errorHandler(async (req, res) => {
  logger.info("List exhibitions by painting request received", {
    paintingId: req.params.paintingId,
  });
  const paintingId = Number(req.params.paintingId);
  if (Number.isNaN(paintingId)) {
    logger.warn("Invalid painting ID for listing exhibitions", {
      paintingId: req.params.paintingId,
    });
    throw new BadRequestError("Invalid painting ID. Must be a number.");
  }

  const list = await listExhibitionsByPainting(paintingId);
  if (!list || list.length === 0) {
    logger.warn("No exhibitions found for painting", { paintingId });
    throw new NotFoundError("No exhibitions found for this painting");
  }
  logger.info("Exhibitions listed for painting", {
    paintingId,
    count: list.length,
  });
  res.status(200).json(list);
});
