import Museum from "../models/museum.model.js";
import {
  validateMuseumData,
  validateMuseumExists,
} from "../errors/MuseumValidationError.js";
import logger from "../utils/logger.js";

const createMuseum = async (data) => {
  logger.debug("Validating museum data", { data });
  const validatedData = validateMuseumData(data);

  logger.info("Creating new museum", { name: validatedData.name });
  const museum = await Museum.create(validatedData);
  logger.info("Museum created successfully", {
    id: museum.id,
    name: museum.name,
  });
  return museum;
};

const getAllMuseums = async () => {
  logger.debug("Fetching all museums");
  const museums = await Museum.findAll();
  logger.info("Retrieved all museums", { count: museums.length });
  return museums;
};

const getMuseumById = async (id) => {
  logger.debug("Fetching museum by ID", { id });
  const museum = await Museum.findByPk(id);
  validateMuseumExists(museum);
  logger.info("Museum found", { id: museum.id, name: museum.name });
  return museum;
};

const updateMuseum = async (id, data) => {
  logger.debug("Updating museum", { id, updateData: data });
  const museum = await Museum.findByPk(id);
  validateMuseumExists(museum);

  const validatedData = validateMuseumData(data);
  await museum.update(validatedData);
  logger.info("Museum updated successfully", {
    id: museum.id,
    name: museum.name,
  });
  return museum;
};

const deleteMuseum = async (id) => {
  logger.debug("Attempting to delete museum", { id });
  const museum = await Museum.findByPk(id);
  validateMuseumExists(museum);

  logger.info("Deleting museum", { id: museum.id, name: museum.name });
  await museum.destroy();
  logger.info("Museum deleted successfully", { id });
  return true;
};

export default {
  createMuseum,
  getAllMuseums,
  getMuseumById,
  updateMuseum,
  deleteMuseum,
};
