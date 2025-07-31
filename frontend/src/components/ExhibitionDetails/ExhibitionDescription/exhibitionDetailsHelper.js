import {
  updateExhibition,
  getExhibitionById,
} from "../../../api/ExhibitionApi";

export const updateExhibitionDescription = async (
  exhibitionId,
  description
) => {
  try {
    const currentExhibition = await getExhibitionById(exhibitionId);

    const updateData = {
      name: currentExhibition.name,
      start_date: currentExhibition.start_date,
      end_date: currentExhibition.end_date,
      museum_id: currentExhibition.museum_id,
      status: currentExhibition.status,
      description: description,
    };

    const response = await updateExhibition(exhibitionId, updateData);
    return response;
  } catch (error) {
    console.error("Failed to update exhibition description:", error);
    throw error;
  }
};
