import { getAllExhibitions } from "../../../api/ExhibitionApi.js";

export const fetchAvailableExhibitions = async () => {
  try {
    const exhibitions = await getAllExhibitions();
    console.log("Fetched exhibitions:", exhibitions);
    return exhibitions;
  } catch (error) {
    console.error("Error fetching available exhibitions:", error);
    throw error;
  }
};

export const formatExhibitionData = (exhibition) => {
  console.log("Formatting exhibition:", exhibition);
  return {
    id: exhibition.exhibition_id,
    title: exhibition.name || exhibition.title,
    startDate: new Date(exhibition.start_date).toLocaleDateString(),
    endDate: new Date(exhibition.end_date).toLocaleDateString(),
    status: exhibition.status,
  };
};
