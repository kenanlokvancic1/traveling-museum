import { ValidationError, NotFoundError } from "./AppError.js";
import Painting from "../models/painting.model.js";

export const validateExhibitionPaintingData = ({
  exhibition_id,
  painting_id,
}) => {
  if (!exhibition_id) {
    throw new ValidationError("Exhibition ID is required");
  }

  if (!painting_id) {
    throw new ValidationError("Painting ID is required");
  }

  if (!Number.isInteger(Number(exhibition_id))) {
    throw new ValidationError("Invalid exhibition ID format");
  }

  if (!Number.isInteger(Number(painting_id))) {
    throw new ValidationError("Invalid painting ID format");
  }

  return {
    exhibition_id: Number(exhibition_id),
    painting_id: Number(painting_id),
  };
};

export const validateExhibitionExists = (exhibition) => {
  if (!exhibition) {
    throw new NotFoundError("Exhibition not found");
  }
  return exhibition;
};

export const validatePaintingExists = (painting) => {
  if (!painting) {
    throw new NotFoundError("Painting not found");
  }
  return painting;
};

export const validateExhibitionPaintingExists = (exhibitionPainting) => {
  if (!exhibitionPainting) {
    throw new NotFoundError("Exhibition painting connection not found");
  }
  return exhibitionPainting;
};

export const validateExhibitionNotFinished = (exhibition) => {
  const exhibitionEnd = new Date(exhibition.end_date);
  if (exhibitionEnd < new Date()) {
    throw new ValidationError("Cannot modify a finished exhibition");
  }
  return exhibition;
};

export const validateNoPaintingOverlap = async (
  exhibition,
  painting_id,
  Exhibition_Painting,
  Exhibition
) => {
  const painting = await Painting.findByPk(painting_id);
  const overlapping = await Exhibition_Painting.findAll({
    where: { painting_id },
    include: [{ model: Exhibition, attributes: ["start_date", "end_date"] }],
  });

  for (const conn of overlapping) {
    const start = new Date(conn.Exhibition.start_date);
    const end = new Date(conn.Exhibition.end_date);
    if (
      new Date(exhibition.start_date) <= end &&
      new Date(exhibition.end_date) >= start
    ) {
      throw new ValidationError(
        `Painting "${painting.title}" is assigned to an overlapping exhibition`
      );
    }
  }
};
