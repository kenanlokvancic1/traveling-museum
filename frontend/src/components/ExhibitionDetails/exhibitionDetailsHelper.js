import { updateExhibition, getExhibitionById } from "../../api/ExhibitionApi";
import { getMuseums } from "../../api/MuseumApi";

export const updateExhibitionDates = async (
  exhibitionId,
  startDate,
  endDate
) => {
  try {
    const currentExhibition = await getExhibitionById(exhibitionId);

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    const updateData = {
      name: currentExhibition.name,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      museum_id: currentExhibition.museum_id,
      status: currentExhibition.status,
      description: currentExhibition.description,
    };

    const response = await updateExhibition(exhibitionId, updateData);
    return response;
  } catch (error) {
    console.error("Failed to update exhibition dates:", error);
    throw error;
  }
};

export const updateExhibitionMuseum = async (exhibitionId, museumId) => {
  try {
    const currentExhibition = await getExhibitionById(exhibitionId);

    const updateData = {
      name: currentExhibition.name,
      start_date: new Date(currentExhibition.start_date)
        .toISOString()
        .split("T")[0],
      end_date: new Date(currentExhibition.end_date)
        .toISOString()
        .split("T")[0],
      museum_id: parseInt(museumId, 10),
      status: currentExhibition.status,
      description: currentExhibition.description,
    };

    const response = await updateExhibition(exhibitionId, updateData);
    return response;
  } catch (error) {
    console.error("Failed to update exhibition museum:", error);
    throw error;
  }
};

export const fetchMuseums = async () => {
  try {
    const response = await getMuseums();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch museums:", error);
    throw error;
  }
};

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const end = new Date(endDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${start} - ${end}`;
};
