import { formGroupClasses } from "@mui/material";
import {
  getExhibitionsByPainting,
  createExhibitionPainting,
  deleteExhibitionPainting,
} from "../../api/ExhibitionPainting";

export const getCurrentExhibitions = async (paintingId) => {
  try {
    const exhibitions = await getExhibitionsByPainting(paintingId);
    return exhibitions;
  } catch (error) {
    console.error("Error getting current exhibitions:", error);
    throw error;
  }
};

export const addPaintingToExhibition = async (exhibitionId, paintingId) => {
  try {
    const result = await createExhibitionPainting(exhibitionId, paintingId);
    return result;
  } catch (error) {
    console.error("Error adding painting to exhibition:", error);
    throw error;
  }
};

export const removePaintingFromExhibition = async (
  exhibitionId,
  paintingId
) => {
  try {
    const result = await deleteExhibitionPainting(exhibitionId, paintingId);
    return result;
  } catch (error) {
    console.error("Error removing painting from exhibition:", error);
    throw error;
  }
};
