import Artist from "../models/artist.model.js";
import ArtistResponseDTO from "../dto/artist/responses/ArtistResponseDTO.js";
import {
  validateArtistData,
  validateArtistExists,
} from "../errors/ArtistValidationError.js";
import logger from "../utils/logger.js";

async function createArtist(artistDto) {
  logger.debug("Validating artist data", { data: artistDto });
  const validatedData = validateArtistData(artistDto);

  logger.debug("Creating new artist in database");
  const newArtist = await Artist.create(validatedData);

  logger.info("New artist created", {
    artistId: newArtist.artist_id,
    name: newArtist.name,
  });

  return new ArtistResponseDTO(newArtist);
}

async function getAllArtists() {
  logger.debug("Fetching all artists from database");
  const artists = await Artist.findAll();

  logger.info("Retrieved all artists", { count: artists.length });
  return artists.map((artist) => new ArtistResponseDTO(artist));
}

async function updateArtist(id, artistDto) {
  logger.debug("Updating artist", { id, updateData: artistDto });
  const validatedData = validateArtistData(artistDto);

  await Artist.update(validatedData, { where: { artist_id: id } });
  const updated = await Artist.findByPk(id);
  validateArtistExists(updated);

  logger.info("Artist updated successfully", {
    id: updated.artist_id,
    name: updated.name,
  });

  return new ArtistResponseDTO(updated);
}

async function deleteArtist(id) {
  logger.debug("Attempting to delete artist", { id });
  const artist = await Artist.findByPk(id);
  validateArtistExists(artist);

  const result = await Artist.destroy({ where: { artist_id: id } });
  logger.info("Artist deleted successfully", {
    id,
    name: artist.name,
  });
  return result;
}

async function getArtistById(id) {
  logger.debug("Fetching artist by ID", { id });
  const artist = await Artist.findByPk(id);
  validateArtistExists(artist);

  logger.info("Retrieved artist", {
    id: artist.artist_id,
    name: artist.name,
  });

  return new ArtistResponseDTO(artist);
}

export {
  createArtist,
  getAllArtists,
  updateArtist,
  deleteArtist,
  getArtistById,
};
