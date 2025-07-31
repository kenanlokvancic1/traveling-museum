import { Op } from "sequelize";
import Exhibition from "../models/exhibition.model.js";
import Museum from "../models/museum.model.js";
import {
  validateExhibitionData,
  validateExhibitionExists,
  validateExhibitionFilters,
} from "../errors/ExhibitionValidationError.js";
import logger from "../utils/logger.js";

export const getExhibitions = async (filters = {}) => {
  logger.debug("Validating exhibition filters", { filters });
  const validatedFilters = validateExhibitionFilters(filters);
  const { search, status, startDate, endDate, museumId } = validatedFilters;

  const whereClause = {};

  if (search) {
    whereClause.name = { [Op.like]: `%${search}%` };
  }

  if (status) {
    whereClause.status = status;
  }

  if (museumId) {
    whereClause.museum_id = museumId;
  }

  if (startDate) {
    whereClause.start_date = { [Op.gte]: startDate };
  }

  if (endDate) {
    whereClause.end_date = { [Op.lte]: endDate };
  }

  logger.debug("Fetching exhibitions with filters", { whereClause });
  const exhibitions = await Exhibition.findAll({
    where: whereClause,
    include: [
      {
        model: Museum,
        as: "Museum",
        attributes: ["name", "location"],
      },
    ],
  });

  logger.info("Retrieved exhibitions", { count: exhibitions.length });
  return exhibitions;
};

export const getExhibitionById = async (id) => {
  logger.debug("Fetching exhibition by ID", { id });
  const exhibition = await Exhibition.findByPk(id, {
    include: [
      {
        model: Museum,
        as: "Museum",
        attributes: ["name", "location"],
      },
    ],
  });
  validateExhibitionExists(exhibition);
  logger.info("Retrieved exhibition", {
    id: exhibition?.exhibition_id,
    name: exhibition?.name,
  });
  return exhibition;
};

export const createExhibition = async (exhibitionData) => {
  logger.debug("Validating exhibition data", { data: exhibitionData });
  const validatedData = validateExhibitionData(exhibitionData);
  logger.debug("Creating new exhibition in database");
  const exhibition = await Exhibition.create(validatedData);
  logger.info("New exhibition created", {
    exhibitionId: exhibition.exhibition_id,
    name: exhibition.name,
  });
  const created = await Exhibition.findByPk(exhibition.exhibition_id, {
    include: [
      {
        model: Museum,
        as: "Museum",
        attributes: ["name", "location"],
      },
    ],
  });
  return created;
};

export const updateExhibition = async (id, exhibitionData) => {
  logger.debug("Updating exhibition", { id, updateData: exhibitionData });
  const exhibition = await Exhibition.findByPk(id);
  validateExhibitionExists(exhibition);

  const validatedData = validateExhibitionData(exhibitionData);
  await exhibition.update(validatedData);

  logger.info("Exhibition updated successfully", {
    id: exhibition.exhibition_id,
    name: exhibition.name,
  });

  const updated = await Exhibition.findByPk(id, {
    include: [
      {
        model: Museum,
        as: "Museum",
        attributes: ["name", "location"],
      },
    ],
  });
  return updated;
};

export const deleteExhibition = async (id) => {
  logger.debug("Attempting to delete exhibition", { id });
  const exhibition = await Exhibition.findByPk(id);
  validateExhibitionExists(exhibition);
  await exhibition.destroy();
  logger.info("Exhibition deleted successfully", {
    id: exhibition.exhibition_id,
    name: exhibition.name,
  });
  return exhibition;
};

export const getExhibitionsByTimeframe = async () => {
  logger.debug("Fetching exhibitions by timeframe");
  const currentDate = new Date();

  const currentExhibitions = await Exhibition.findAll({
    where: {
      start_date: { [Op.lte]: currentDate },
      end_date: { [Op.gte]: currentDate },
    },
    include: [
      {
        model: Museum,
        as: "Museum",
        attributes: ["name", "location"],
      },
    ],
  });

  const pastExhibitions = await Exhibition.findAll({
    where: {
      end_date: { [Op.lt]: currentDate },
    },
    include: [
      {
        model: Museum,
        as: "Museum",
        attributes: ["name", "location"],
      },
    ],
  });

  const futureExhibitions = await Exhibition.findAll({
    where: {
      start_date: { [Op.gt]: currentDate },
    },
    include: [
      {
        model: Museum,
        as: "Museum",
        attributes: ["name", "location"],
      },
    ],
  });

  logger.info("Exhibitions by timeframe fetched", {
    current: currentExhibitions.length,
    past: pastExhibitions.length,
    future: futureExhibitions.length,
  });

  return {
    current: currentExhibitions,
    past: pastExhibitions,
    future: futureExhibitions,
  };
};
