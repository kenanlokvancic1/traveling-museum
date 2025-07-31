import * as exhibitionService from "../services/exhibition.service.js";
import ExhibitionCreateRequestDTO from "../dto/exhibition/requests/ExhibitionCreateRequestDTO.js";
import ExhibitionUpdateRequestDTO from "../dto/exhibition/requests/ExhibitionUpdateRequestDTO.js";
import ExhibitionResponseDTO from "../dto/exhibition/responses/ExhibitionResponseDTO.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFoundError, ValidationError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const getAllExhibitions = errorHandler(async (req, res) => {
  logger.info("Get all exhibitions request received", { query: req.query });
  const filters = {
    search: req.query.search,
    status: req.query.status,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    museumId: req.query.museumId,
  };

  const exhibitions = await exhibitionService.getExhibitions(filters);
  const exhibitionDTOs = exhibitions.map(
    (exhibition) => new ExhibitionResponseDTO(exhibition)
  );
  logger.info("All exhibitions retrieved", { count: exhibitionDTOs.length });
  return res.status(200).json(exhibitionDTOs);
});

export const getExhibitionsByTimeframe = errorHandler(async (req, res) => {
  logger.info("Get exhibitions by timeframe request received");
  const exhibitions = await exhibitionService.getExhibitionsByTimeframe();

  const result = {
    current: exhibitions.current.map(
      (exhibition) => new ExhibitionResponseDTO(exhibition)
    ),
    past: exhibitions.past.map(
      (exhibition) => new ExhibitionResponseDTO(exhibition)
    ),
    future: exhibitions.future.map(
      (exhibition) => new ExhibitionResponseDTO(exhibition)
    ),
  };

  logger.info("Exhibitions by timeframe retrieved", {
    current: result.current.length,
    past: result.past.length,
    future: result.future.length,
  });

  return res.status(200).json(result);
});

export const getExhibitionById = errorHandler(async (req, res) => {
  logger.info("Get exhibition by ID request received", { id: req.params.id });
  const { id } = req.params;
  const exhibition = await exhibitionService.getExhibitionById(id);

  if (!exhibition) {
    logger.warn("Exhibition not found", { id });
    throw new NotFoundError("Exhibition not found");
  }

  logger.info("Exhibition retrieved", { id });
  return res.status(200).json(new ExhibitionResponseDTO(exhibition));
});

export const createExhibition = errorHandler(async (req, res) => {
  logger.info("Create exhibition request received", { body: req.body });
  const exhibitionDTO = new ExhibitionCreateRequestDTO(req.body);

  if (new Date(exhibitionDTO.start_date) >= new Date(exhibitionDTO.end_date)) {
    logger.warn("Invalid exhibition dates", {
      start_date: exhibitionDTO.start_date,
      end_date: exhibitionDTO.end_date,
    });
    throw new ValidationError("Start date must be before end date", [
      {
        field: "dates",
        message: "Start date must be before end date",
      },
    ]);
  }

  const exhibition = await exhibitionService.createExhibition(exhibitionDTO);
  logger.info("Exhibition created successfully", {
    id: exhibition.exhibition_id,
  });
  return res.status(201).json(new ExhibitionResponseDTO(exhibition));
});

export const updateExhibition = errorHandler(async (req, res) => {
  logger.info("Update exhibition request received", {
    id: req.params.id,
    body: req.body,
  });
  const { id } = req.params;
  const exhibitionDTO = new ExhibitionUpdateRequestDTO(req.body);

  if (exhibitionDTO.start_date && exhibitionDTO.end_date) {
    if (
      new Date(exhibitionDTO.start_date) >= new Date(exhibitionDTO.end_date)
    ) {
      logger.warn("Invalid exhibition dates for update", {
        start_date: exhibitionDTO.start_date,
        end_date: exhibitionDTO.end_date,
      });
      throw new ValidationError("Start date must be before end date", [
        {
          field: "dates",
          message: "Start date must be before end date",
        },
      ]);
    }
  }

  const exhibition = await exhibitionService.updateExhibition(
    id,
    exhibitionDTO
  );
  if (!exhibition) {
    logger.warn("Exhibition not found for update", { id });
    throw new NotFoundError("Exhibition not found");
  }
  logger.info("Exhibition updated successfully", { id });
  return res.status(200).json(new ExhibitionResponseDTO(exhibition));
});

export const deleteExhibition = errorHandler(async (req, res) => {
  logger.info("Delete exhibition request received", { id: req.params.id });
  const { id } = req.params;
  const result = await exhibitionService.deleteExhibition(id);
  if (!result) {
    logger.warn("Exhibition not found for deletion", { id });
    throw new NotFoundError("Exhibition not found");
  }
  logger.info("Exhibition deleted successfully", { id });
  return res.status(204).end();
});
